export class AllProviders{
    id: number;
    name: string;
}

export interface oneProvider{
    id: number;
    name: string;
    provider_product: provider_product;
}

export interface provider_product {
    discount: string;
    category: category;
    provider: number;
    for_package: boolean;
}

export interface category {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
}