// activate broker user
export interface IActivateBrokerData {
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}

export class ActivateBrokerData implements IActivateBrokerData {
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}