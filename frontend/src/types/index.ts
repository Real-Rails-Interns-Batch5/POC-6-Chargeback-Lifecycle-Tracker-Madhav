export interface ChargebackCase {
  id: string;
  order_id: string;
  merchant_name: string;
  amount: number;
  currency: string;
  dispute_date: string;
  case_status: 'opened' | 'under_review' | 'merchant_response' | 'resolved';
  dispute_reason: 'fraud' | 'item_not_received' | 'quality_issue' | 'not_as_described';
  card_network: 'visa' | 'mastercard' | 'amex' | 'discover';
  loss_allocation: number;
  merchant_response_evidence: string[];
  root_cause_tags: string[];
  merchant_win_rate?: number;
  expected_resolution_date?: string;
}

export interface TimelineEvent {
  timestamp: string;
  event_type: 'opened' | 'response_submitted' | 'bank_review' | 'resolved';
  description: string;
  actor: 'merchant' | 'customer' | 'issuer' | 'acquirer';
}

export interface ChargebackStats {
  total_cases: number;
  open_cases: number;
  resolved_cases: number;
  merchant_win_count: number;
  merchant_loss_count: number;
  avg_dispute_amount: number;
  total_chargeback_volume: number;
}

export interface DisputeOutcomeStats {
  favorable_to_merchant: number;
  favorable_to_customer: number;
  pending: number;
  settlement: number;
}

export interface FilterState {
  status?: string;
  merchant?: string;
  reason?: string;
  network?: string;
}
