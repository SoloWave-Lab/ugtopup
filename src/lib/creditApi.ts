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




