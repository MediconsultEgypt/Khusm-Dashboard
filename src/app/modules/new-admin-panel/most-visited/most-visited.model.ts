export interface mostVisitedResponse {
    results: mostVisited[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface mostVisited {
    id: number;
    provider: string;
    number_of_visits: number;
}