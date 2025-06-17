package com.example.docexam.service;

import com.example.docexam.entity.Article;
import com.example.docexam.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    // Get all articles
    public List<Article> getAllArticles() {
        return articleRepository.findAllByOrderByCreatedAtDesc();
    }

    // Get article by ID
    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    // Create new article
    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    // Update existing article
    public Article updateArticle(Long id, Article articleDetails) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));

        article.setTitle(articleDetails.getTitle());
        article.setDescription(articleDetails.getDescription());

        return articleRepository.save(article);
    }

    // Delete article
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));

        articleRepository.delete(article);
    }

    // Search articles by keyword
    public List<Article> searchArticles(String keyword) {
        return articleRepository.findByKeyword(keyword);
    }
}