export interface Restroom {
    accessible?: boolean;
    changing_table?: boolean;
    city?: string;
    comment?: string;
    country?: string;
    created_at?: string;
    directions?: string;
    distance?: number;
    downvote?: number;
    id?: number;
    latitude?: number;
    longitude?: number;
    name?: string;
    state?: string;
    street?: string;
    unisex?: boolean;
    updated_at?: string;
    upvote?: number;
}
export interface RestroomListMatch {
    ada?: boolean;
    lat?: number;
    lng?: number;
    page?: number;
    per_page?: number;
    unisex?: boolean;
    $action?: string;
    [action: string]: any;
}
