package com.example.docexam.repository;

import com.example.docexam.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // Find articles by title containing keyword (case insensitive)
    List<Article> findByTitleContainingIgnoreCase(String keyword);

    // Find articles ordered by creation date (newest first)
    List<Article> findAllByOrderByCreatedAtDesc();

    // Custom query to find articles by keyword in title or description
    @Query("SELECT a FROM Article a WHERE " +
            "LOWER(a.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Article> findByKeyword(String keyword);
}