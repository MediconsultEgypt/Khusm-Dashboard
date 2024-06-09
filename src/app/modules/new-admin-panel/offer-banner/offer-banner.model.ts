export class offerBannerData {
    id: number;
    title: string;
    image: string;
    order: number;
    provider: number;
}

export interface OfferBannerResponse {
    results: offerBannerData[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}