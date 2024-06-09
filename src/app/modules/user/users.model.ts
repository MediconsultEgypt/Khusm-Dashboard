export interface ICreateClientData {
    client_name: string | undefined;
    file: File | undefined;
    package_id: number | undefined;
    sheet_name: string | undefined;
}

export class CreateClientData implements ICreateClientData {
    client_name: string | undefined;
    file: File | undefined;
    package_id: number | undefined;
    sheet_name: string | undefined;
}