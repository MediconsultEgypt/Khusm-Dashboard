// total provider ratings
export interface prov_ratings {
    provider__name: string;
    avg_rating: number;
}

// total visits
export interface total_visits {
    provider__name: string;
    total_visits: number;
}

// total provider orders
export interface total_prov_orders {
    provider__name: string;
    total_before_discount: number;
    total_after_discount: number;
    total_discount: number;
}

// total provider branches orders
export interface prov_branch_orders {
    provider_branch__name: string;
    total_before_discount: number;
    total_after_discount: number;
    total_discount: number;
}