export interface brokerNameResponse {
    results: brokerName[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface brokerName {
    id: number;
    name: string;
}