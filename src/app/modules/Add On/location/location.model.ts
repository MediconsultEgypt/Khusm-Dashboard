export interface locationData {
    id: number;
    area: area[];
    governrate: string;
}

export interface area {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    lat: string;
    lang: string;
    address: string;
    address_en: string;
    address_ar: string;
}