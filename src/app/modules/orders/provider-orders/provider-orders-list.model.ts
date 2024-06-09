export interface providerOrderResponse {
    results: providerOrderList[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface providerOrderList {
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
    user_first_name: string;
    user_last_name: string;
    user_package_type: userPackage [];
    categories: categories [];
    provider_name: string;
    provider_number: string;

}

export interface userPackage {

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