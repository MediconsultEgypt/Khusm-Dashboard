export class onlineOrderData {
    id: number;
    address: string;
    order: string;
    image: string;
    date: string;
    time: string;
    provider_notes: string;
    status: string;
    total_order_price: number;
    provider_branch: number;
    user: number;
}

export interface userPackageResponse {
    results: onlineOrderData[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}