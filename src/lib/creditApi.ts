import { requestDeduplicator } from './requestDeduplicator';

export interface CreditRequest {
  request_id: string;
  credits: number;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  processed_at?: string;
  remarks?: string;
  user_name?: string;
  user_email?: string;
}

// Normalized credit history entry for display
export interface CreditHistoryEntry {
  ordernumber: string;
  credits: number;
  status: string;
}

// Raw webhook response format (what n8n actually sends)
interface WebhookCreditResponse {
  user_email?: string;  // n8n might send this
  email?: string;       // or this
  credits?: number;     // n8n sends this (plural) - PRIMARY
  Credit?: number;      // n8n might send this (capital C)
  credit?: number;      // or this (lowercase c)
}

// Normalized format for the app
export interface CreditBalance {
  email: string;
  credit: number;
}

const HISTORY_WEBHOOK = 'https://n8n.aiagentra.com/webhook/payment-pending';
const BALANCE_WEBHOOK = 'https://n8n.aiagentra.com/webhook/checkcredit';
const SUBMIT_WEBHOOK = 'https://n8n.aiagentra.com/webhook/payment-pending';

/**
 * Fetch user's credit balance from n8n
 */
export const fetchCreditBalance = async (email: string): Promise<CreditBalance> => {
  return requestDeduplicator.dedupe(`balance:${email}`, async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    console.log('[DEBUG] Fetching credit balance for:', email);

    try {
      const response = await fetch(`${BALANCE_WEBHOOK}?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      console.log('[DEBUG] Balance response status:', response.status, 'OK:', response.ok);

      if (!response.ok) {
        throw new Error(`Failed to fetch credit balance: ${response.status}`);
      }

      let data: any;
      const contentType = response.headers.get('content-type') || '';
      try {
        if (contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.log('[DEBUG] Balance raw text response:', text);
          // Parse simple "key: value" lines to an object
          const lines = text.split(/\r?\n/).filter(Boolean);
          const obj: Record<string, string> = {};
          for (const line of lines) {
            const [key, ...rest] = line.split(':');
            if (!key) continue;
            obj[key.trim()] = rest.join(':').trim();
          }
          data = obj;
        }
      } catch (e) {
        console.warn('[DEBUG] Failed to parse JSON, falling back to text if available');
        const text = await response.text();
        const lines = text.split(/\r?\n/).filter(Boolean);
        const obj: Record<string, string> = {};
        for (const line of lines) {
          const [key, ...rest] = line.split(':');
          if (!key) continue;
          obj[key.trim()] = rest.join(':').trim();
        }
        data = obj;
      }

      console.log('[DEBUG] Balance response data (raw):', data);

      // If webhook returns an array, extract the first element
      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error('Webhook returned empty array');
        }
        console.log('[DEBUG] Response is an array, extracting first element');
        data = data[0];
        console.log('[DEBUG] Extracted first element:', data);
      }

      // Handle different field name formats from n8n and coerce types
      const parsedEmail = (data.user_email || data.email || '').toString().trim();
      // Priority order: credits (plural), Credit (capital), credit (lowercase)
      const rawCredit = (data.credits ?? data.Credit ?? data.credit) as unknown;

      // Coerce credit to number even if it comes as a string like "500" or "500 Cr"
      let creditAmount: number | undefined;
      if (typeof rawCredit === 'number') {
        creditAmount = rawCredit;
      } else if (typeof rawCredit === 'string') {
        const cleaned = rawCredit.replace(/[^\d.-]/g, '');
        const n = Number.parseFloat(cleaned);
        creditAmount = Number.isFinite(n) ? n : undefined;
      }

      console.log('[DEBUG] Parsed email:', parsedEmail, 'credit:', creditAmount);

      // If webhook omits email or case differs, proceed but warn; use requested email as source of truth
      if (parsedEmail && parsedEmail.toLowerCase() !== email.toLowerCase()) {
        console.warn(`[DEBUG] Email mismatch in response. Expected: ${email}, Got: ${parsedEmail}. Proceeding with requested email.`);
      }

      if (typeof creditAmount !== 'number') {
        throw new Error(`Invalid credit value in response: ${String(rawCredit)} (type: ${typeof rawCredit})`);
      }

      // Return normalized format
      return {
        email,
        credit: creditAmount
      };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('[DEBUG] Request timeout for credit balance');
        throw new Error('Request timeout: Server took too long to respond');
      }
      
      console.error('[DEBUG] Error fetching credit balance:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        email
      });
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  });
};

/**
 * Fetch credit request history from n8n webhook
 * Returns array of normalized credit history entries for display
 */
export const fetchCreditHistory = async (email: string): Promise<CreditHistoryEntry[]> => {
  return requestDeduplicator.dedupe(`history:${email}`, async () => {
    console.log(`[FETCH] Getting credit history for: ${email}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      const response = await fetch(HISTORY_WEBHOOK, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log(`[FETCH] History response status: ${response.status}`);
      console.log(`[FETCH] History response content-type: ${response.headers.get('content-type')}`);

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let data: any;

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error('Invalid data received');
        }
      }

      console.log('[DEBUG] History response data (raw):', data);
      console.log('[DEBUG] History response type:', Array.isArray(data) ? 'array' : typeof data);

      // Handle different response formats
      let records: any[] = [];
      
      if (Array.isArray(data)) {
        records = data;
      } else if (data && typeof data === 'object') {
        // Check for nested arrays
        if (Array.isArray(data.requests)) {
          records = data.requests;
        } else if (Array.isArray(data.data)) {
          records = data.data;
        } else if (Array.isArray(data.history)) {
          records = data.history;
        } else {
          records = [data];
        }
      }

      console.log('[DEBUG] Extracted records count:', records.length);
      if (records.length > 0) {
        console.log('[DEBUG] First record sample:', records[0]);
      }

      // Normalize keys helper
      const normKey = (k: string) => k.toString().replace(/[\s_-]+/g, "").toLowerCase();

      // Normalize each record
      const normalized: CreditHistoryEntry[] = records
        .map((item, index) => {
          // Create normalized key map
          const km: Record<string, any> = {};
          Object.entries(item).forEach(([k, v]) => {
            km[normKey(k)] = v;
          });

          // Extract ordernumber (various possible field names)
          const orderRaw = km.ordernumber ?? km.orderid ?? km.order ?? km.requestid ?? km.id ?? String(index + 1);
          
          // Extract credits (various possible field names, coerce to number)
          const creditRaw = km.credits ?? km.credit ?? km.amount ?? 0;
          
          // Extract status (various possible field names, lowercase)
          const statusRaw = km.status ?? km.state ?? km.approved ?? "pending";

          const ordernumber = String(orderRaw).trim();
          const credits = typeof creditRaw === "number" 
            ? creditRaw 
            : Number.parseFloat(String(creditRaw).replace(/[^\d.-]/g, "")) || 0;
          const status = String(statusRaw).trim().toLowerCase();

          return { ordernumber, credits, status };
        })
        .filter(entry => entry.ordernumber && Number.isFinite(entry.credits));

      console.log('[DEBUG] Normalized records count:', normalized.length);
      if (normalized.length > 0) {
        console.log('[DEBUG] First normalized record:', normalized[0]);
      }

      return normalized;

    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('[ERROR] Credit history fetch failed:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      
      if (error.message?.includes('Invalid data')) {
        throw new Error('Invalid data received');
      }
      
      throw new Error('Failed to load credit history');
    }
  });
};

/**
 * Submit a new credit top-up request to n8n
 */
export const submitCreditRequest = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch(SUBMIT_WEBHOOK, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error:', response.status, errorText);
      throw new Error('Failed to submit request to webhook');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting credit request:', error);
    throw error;
  }
};
