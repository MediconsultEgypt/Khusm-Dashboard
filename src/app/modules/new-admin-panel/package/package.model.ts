export class packages {
    id: number;
    title: string;
    price: string;
    months: number;
    days: number;
    is_active: boolean;
    package_items: string[];
}

export interface provResponse {
    results: packages[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
  }