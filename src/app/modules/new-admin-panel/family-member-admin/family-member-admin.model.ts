export class family_memberData {
    id: number;
    phone_number: string;
    family_member_status: string;
    status: string;
    payment_method: string;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    city: string;
    currency: string;
    phone: string;
    address: string;
    timestamp: string;
    wallet_mobile_number: string;
    is_wallet_payment: boolean;
    parent_user: number;
    member_user: number;
    user_package_kid_related: any;
}

export interface userPackageResponse {
    results: family_memberData[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}