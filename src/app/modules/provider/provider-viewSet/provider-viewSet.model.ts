import { PercentPipe } from "@angular/common";
import { provider_product } from "../provider-list/provider-list.model";

export interface Allprovider_viewSet {
    id: number;
    discount_percentage: PercentPipe;
    min_distance: number;
    online_order_available: boolean;
    avg_rate: PercentPipe;
    provider_category_name: string;
    name: string;
    name_en: string;
    name_ar: string;
    phone: number;
    description: string;
    description_en: string;
    description_ar: string;
    image: string;
    is_best_deal: boolean;
    provider_category: number;
}

export interface providerResponse {
    results: Allprovider_viewSet[];
    count: number;
    next: string | null;
    pages_number: number;
    previous: string | null;
  }

  export interface provider_barnch {
    id: number;
    distance: string;
    name: string;
    name_en: string;
    name_ar: string;
    latitude: string;
    longitude: string;
    provider_branch_location: string;
    email: string;
    branch_online_order_available: boolean;
    provider: number;
    user: number;
  }
   
  export interface oneProvider_viewSet {
    id: number;
    provider_barnch: provider_barnch;
    provider_product: provider_product;
    provider_rate: any[];
    avg_rate: string;
    provider_category_name: string;
    name: string;
    name_en: string;
    name_ar: string;
    phone: string;
    description: string;
    description_en: string;
    description_ar: string;
    image: string;
    is_best_deal: boolean;
    provider_category: number;
  }