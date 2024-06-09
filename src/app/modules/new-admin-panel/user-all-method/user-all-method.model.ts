export interface userMethodResponse {
    results: userMethod[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}

export interface userMethod {
    id: number;
    last_login: string;
    is_superuser: boolean;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    date_joined: string;
    email: string;
    username: string;
    phone: string;
    gender: string;
    address: string;
    is_active: boolean;
    is_app_user: boolean;
    date_of_birth: string;
    verification_code: string;
    points: number;
    password_reset_code: string;
    otp_secret: string;
    otp_status: string;
    forget_password_otp_status: string;
    savings: number;
    promotion_code: string;
    referal_code: string;
    client: string;
    groups: Groups[];
    user_permissions: User_permissions[];
}

export interface Groups {
}

export interface User_permissions {
}