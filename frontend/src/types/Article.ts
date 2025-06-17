export interface Article {
    id?: number;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ArticleFormData {
    title: string;
    description: string;
}