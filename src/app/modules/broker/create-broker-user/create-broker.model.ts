export interface ICreateBrokerData {
    number_users: number | undefined;
    broker: number | undefined;
    package_id: number | undefined;
}

export class CreateBrokerData implements ICreateBrokerData {
    number_users: number | undefined;
    broker: number | undefined;
    package_id: number | undefined;
}