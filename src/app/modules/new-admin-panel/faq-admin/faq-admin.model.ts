export class faqAdminData {
    id: number;
    question: string;
    question_en: string;
    question_ar: string;
    answer: string;
    answer_en: string;
    answer_ar: string;
    order: number;
}

export interface faqAdminResponse {
    results: faqAdminData[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
}