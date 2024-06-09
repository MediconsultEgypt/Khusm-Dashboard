export class userPackageData {
    id: number;
    created_at: string;
    start_date: string;
    end_date: string;
    has_package: boolean;
    user: number;
    package: any[];
}

export interface userPackageResponse {
    results: userPackageData[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}