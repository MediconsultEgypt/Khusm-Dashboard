export class category {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
}

export interface providerResponse {
    results: category[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
  }