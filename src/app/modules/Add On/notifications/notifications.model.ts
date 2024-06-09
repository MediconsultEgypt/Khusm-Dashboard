export interface NotificationData {
    id: number;
    seen: boolean;
    min_distance: number;
    target_content_type_name: string;
    date_time: string;
    title: string;
    text: string;
    created_at: string;
    template_slug: number;
    target_object_id: number;
    general: boolean;
    user: number;
    seen_info: seen_info[];
}

export interface notificationResponse {
  results: NotificationData[];
  count: number;
  next: string | null;
  pages_number: number;
  previous: string | null;
}

export interface seen_info {
  id: number;
  seen_at: string;
  notification: number;
  user: number;
}

