package com.nemisolv.repository;

import com.nemisolv.entity.Question;
import com.nemisolv.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag,Long> {
    Optional<Tag> findByName(String name);

    Optional<Tag> findByNameIgnoreCase(String name);

    @Query("SELECT t FROM Tag t WHERE t.name LIKE %:searchQuery%")
    Page<Tag> findAllTags(Pageable pageable, String searchQuery);
    // find top 10 popular tags
    @Query("SELECT t FROM Tag t LEFT JOIN t.questions q WHERE q.banned = false AND q.deleted = false GROUP BY t.id ORDER BY COUNT(q) DESC")
    List<Tag> findPopularTags();
    @Query("SELECT t FROM Tag t LEFT JOIN t.questions q WHERE " +
            "(LOWER(t.name) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :searchQuery, '%'))) " +
            "GROUP BY t ORDER BY COUNT(q) DESC")
    Page<Tag> findAllMostQuestionsTag(Pageable pageable,String searchQuery);

    @Query("SELECT t FROM Tag t WHERE t.name = :name")
    List<Tag> findByTagName(String name, Pageable pageable);

    @Query("SELECT t FROM Tag t LEFT JOIN t.questions q WHERE q.banned = false AND q.deleted = false GROUP BY t.id ORDER BY COUNT(q) DESC")
    List<Tag> findTopTag(Pageable pageable);

}
