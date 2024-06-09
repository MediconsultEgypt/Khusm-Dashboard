export interface providerProductResponse {
    results: providerProduct[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface providerProduct {
    id: number;
    discount: string;
    for_package: boolean;
    khusm_discount: string;
    provider: number;
    category: number;
}