// export enum Role {
//     User = 'User',
//     Admin = 'Admin',
//     Provider = 'Provider'
//   }
export class user {
    id: number;
    phone: number;
    email: string;
    gender: string;
    date_of_birth: Date;
    first_name: string;
    last_name: string;
    address: string;
    points: number;
    referal_code: string;
    savings: number;
    user_package: [];
    // role: Role;
}

export class token {
    refresh_token: string;
    access_token: string;
}

export interface userAdmin {
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    provider_name: string;
    // role: Role;
}