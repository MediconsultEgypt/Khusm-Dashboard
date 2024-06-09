export interface Allprovider_branch {
    id: number;
    distance: number;
    name: string;
    name_en: string;
    name_ar: string;
    latitude: string;
    longitude: string;
    provider_branch_location: string;
    email: string;
    branch_online_order_available: boolean;
    provider: number;
    user: number;
}

export interface providerResponse {
    results: Allprovider_branch[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
  }