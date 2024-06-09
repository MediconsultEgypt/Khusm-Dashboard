export class packages_promo_code {
    id: number;
    name: string;
    code: string;
    valid_from: string;
    valid_to: string;
    usage_limit: number;
    used_times: number;
    active: boolean;
    percent_discount: number;
    generate_more: boolean;
    number_of_promocodes: number;
}

export interface packageResponse {
    results: packages_promo_code[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
  }