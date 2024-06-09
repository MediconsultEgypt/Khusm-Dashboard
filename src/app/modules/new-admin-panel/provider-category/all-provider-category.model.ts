export interface providerCategoryResponse {
    results: providerCategory[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface providerCategory {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    image: string;
    order: number;
}