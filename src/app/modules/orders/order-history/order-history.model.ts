export interface orderHistoryData {
    total_amount_before_discount: string;
    provider: number;
    is_paid: boolean;
    provider_branch: string;
    timestamp: Date;
    discount: string;
    paid_amount: string;
    id: number;
    transaction_id: string;
    user: string;
    categories: categories [];
    provider_name: string;
    provider_number: string;
}

export interface categories {
    id: number;
    price: string;
    discount: number;
    categories: category;

}

export interface category {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
}

export interface total_invoices{
    total_invoices: number;
}