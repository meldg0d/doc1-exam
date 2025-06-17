import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Save, X } from 'lucide-react';

interface Article {
    id?: number;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [formData, setFormData] = useState<Article>({ title: '', description: '' });
    const [error, setError] = useState<string | null>(null);

    // Fetch all articles
    const fetchArticles = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/articles`);
            if (!response.ok) throw new Error('Failed to fetch articles');
            const data = await response.json();
            setArticles(data);
        } catch (err) {
            setError('Failed to load articles. Make sure your backend is running.');
            console.error('Error fetching articles:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Search articles
    const searchArticles = async (keyword: string) => {
        if (!keyword.trim()) {
            fetchArticles();
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/articles/search?keyword=${encodeURIComponent(keyword)}`);
            if (!response.ok) throw new Error('Failed to search articles');
            const data = await response.json();
            setArticles(data);
        } catch (err) {
            setError('Failed to search articles');
            console.error('Error searching articles:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create or update article
    const saveArticle = async () => {
        if (!formData.title.trim()) return;

        setIsLoading(true);
        setError(null);
        try {
            const url = editingArticle
                ? `${API_BASE_URL}/articles/${editingArticle.id}`
                : `${API_BASE_URL}/articles`;

            const method = editingArticle ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to save article');

            await fetchArticles();
            resetForm();
        } catch (err) {
            setError('Failed to save article');
            console.error('Error saving article:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete article
    const deleteArticle = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete article');

            await fetchArticles();
        } catch (err) {
            setError('Failed to delete article');
            console.error('Error deleting article:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({ title: '', description: '' });
        setEditingArticle(null);
        setShowForm(false);
    };

    // Start editing
    const startEdit = (article: Article) => {
        setEditingArticle(article);
        setFormData({ title: article.title, description: article.description });
        setShowForm(true);
    };

    // Handle search
    const handleSearch = () => {
        searchArticles(searchTerm);
    };

    // Handle search on Enter key
    const handleSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handle save on Enter key (for title input)
    const handleTitleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveArticle();
        }
    };

    // Load articles on component mount
    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Tabloid Articles</h1>

                    {/* Search and Add Button */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleSearchKeyPress}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Search
                            </button>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Article
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Article Form */}
                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingArticle ? 'Edit Article' : 'Add New Article'}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    onKeyPress={handleTitleKeyPress}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={saveArticle}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {editingArticle ? 'Update' : 'Save'}
                                </button>

                                <button
                                    onClick={resetForm}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Articles List */}
                <div className="space-y-4">
                    {isLoading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Loading...</p>
                        </div>
                    )}

                    {!isLoading && articles.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No articles found. Create your first article!</p>
                        </div>
                    )}

                    {!isLoading && articles.map((article) => (
                        <div key={article.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3">{article.description}</p>
                                    <p className="text-sm text-gray-400">
                                        Created: {new Date(article.createdAt || '').toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => startEdit(article)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit article"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => deleteArticle(article.id!)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete article"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;