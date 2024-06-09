export interface brokerDealResponse {
    results: brokerDeal[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface brokerDeal {
    id: number;
    date: string;
    broker: number;
    users: users[];
}

export interface users {

}