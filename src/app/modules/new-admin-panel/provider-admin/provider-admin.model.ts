export interface providerAdminResponse {
    results: providerAdmin[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface providerAdmin {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    phone: string;
    description: string;
    description_en: string;
    description_ar: string;
    image: string;
    is_best_deal: boolean;
    best_deal_order: string;
    khusm_code: string;
    due_date: string;
    provider_category: number;
}