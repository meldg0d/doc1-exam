import type {Article} from '../types/Article';

const API_BASE_URL = 'http://localhost:8080/api';

export class ArticleService {
    static async getAllArticles(): Promise<Article[]> {
        const response = await fetch(`${API_BASE_URL}/articles`);
        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }
        return response.json();
    }

    static async getArticleById(id: number): Promise<Article> {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch article');
        }
        return response.json();
    }

    static async createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
        const response = await fetch(`${API_BASE_URL}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        });

        if (!response.ok) {
            throw new Error('Failed to create article');
        }
        return response.json();
    }

    static async updateArticle(id: number, article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        });

        if (!response.ok) {
            throw new Error('Failed to update article');
        }
        return response.json();
    }

    static async deleteArticle(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete article');
        }
    }

    static async searchArticles(keyword: string): Promise<Article[]> {
        const response = await fetch(`${API_BASE_URL}/articles/search?keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) {
            throw new Error('Failed to search articles');
        }
        return response.json();
    }
}