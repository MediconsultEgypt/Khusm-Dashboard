export class orderData {
    id: number;
    total_amount_before_discount: string;
    paid_amount: string;
    discount: string;
    timestamp: string;
    is_paid: boolean;
    transaction_id: string;
    order_code: string;
    khusm_discount: string;
    refund_code: string;
    otp_secret: string;
    is_deleted: boolean;
    otp_status: string;
    user: number;
    provider: number;
    provider_branch: number;
    category: any[];
}

export interface orderResponse {
    results: orderData[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}