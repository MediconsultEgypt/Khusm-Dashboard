export class order_packages {
    id: number;
    status: string;
    payment_method: string;
    first_name: string;
    last_name: string;
    email: string;
    country: number;
    city: number;
    currency: string;
    phone: string;
    address: string;
    timestamp: string;
    paid_amount: string;
    total_amount_before_discount: string;
    discount_percentage: number;
    wallet_mobile_number: string;
    is_wallet_payment: boolean;
    is_free: boolean;
    user: number;
    promocode: string;
    package: any[];
}

export interface packageResponse {
    results: order_packages[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}