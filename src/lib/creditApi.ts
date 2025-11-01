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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(`${BALANCE_WEBHOOK}?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch credit balance: ${response.status}`);
    }

    const data = await response.json();

    // Validate email matches
    if (data.email !== email) {
      throw new Error('Email mismatch in response');
    }

    // Validate credit field exists and is a number
    if (typeof data.credit !== 'number') {
      throw new Error('Invalid credit value in response');
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout: Server took too long to respond');
    }
    console.error('Error fetching credit balance:', error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Fetch user's credit request history from n8n
 */
export const fetchCreditHistory = async (email: string): Promise<CreditRequest[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(`${HISTORY_WEBHOOK}?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch credit history: ${response.status}`);
    }

    const data = await response.json();

    // Ensure we return an array
    if (!Array.isArray(data)) {
      console.warn('Credit history response is not an array, returning empty array');
      return [];
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout: Server took too long to respond');
    }
    console.error('Error fetching credit history:', error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
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
