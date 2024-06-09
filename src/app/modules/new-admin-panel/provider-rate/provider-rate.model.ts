export class prov_rate {
    id: number;
    rate: number;
    comment: string;
    provider: number;
    user: number;
}

export interface providerResponse {
    results: prov_rate[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
  }