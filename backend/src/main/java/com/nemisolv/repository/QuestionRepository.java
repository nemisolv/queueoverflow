package com.nemisolv.repository;

import com.nemisolv.entity.Question;
import com.nemisolv.entity.Tag;
import com.nemisolv.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    // search integrated full text search
    @Query("SELECT q FROM Question q WHERE q.banned = false AND q.deleted = false AND  " +
            "(LOWER(q.title) LIKE LOWER(CONCAT('%',:searchQuery,'%')) OR " +
            "LOWER(q.explanation) LIKE LOWER(CONCAT('%',:searchQuery,'%'))) ")
    Page<Question> findAllQuestions(Pageable pageable, String searchQuery);

    @Query("SELECT q FROM Question q WHERE q.slug = :slug AND q.banned = false AND q.deleted = false")
    Optional<Question> findBySlug(String slug);


    @Query("SELECT q FROM Question q WHERE q.author.id = :userId AND q.banned = false AND q.deleted = false")
    Page<Question> findAllByAuthorId(Long userId, Pageable pageable);

    boolean existsBySlug(String slug);
// find top questions based on views and upvotes
@Query("SELECT q FROM Question q LEFT JOIN q.upvotes u WHERE q.deleted = false AND q.banned = false GROUP BY q.id ORDER BY q.views DESC, COUNT(u) DESC")
List<Question> findTopQuestions();

    // get saved question

//    Page<Question> findAllBySavedUsers_Id(Long userId, Pageable pageable);


    @Query("SELECT q FROM Question q LEFT JOIN q.tags t WHERE t.id = :tagId AND q.banned = false AND q.deleted = false" +
            " AND (LOWER(q.title) LIKE LOWER(CONCAT('%',:searchQuery,'%')) OR " +
            "LOWER(q.explanation) LIKE LOWER(CONCAT('%',:searchQuery,'%'))) ")
    Page<Question> findAllByTagId(Pageable pageable, Long tagId, String searchQuery);

    @Query("SELECT q FROM Question q LEFT JOIN q.answers a WHERE q.banned = false AND q.deleted = false " +
            "AND (LOWER(q.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
            "LOWER(q.explanation) LIKE LOWER(CONCAT('%', :searchQuery, '%')))" +
            "GROUP BY q having count(a) =0")
    Page<Question> findAllUnansweredQuestions(Pageable pageable,String searchQuery);

    @Query("SELECT q FROM Question q LEFT JOIN q.answers a WHERE q.banned = false AND q.deleted = false " +
            " AND (LOWER(q.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
            "LOWER(q.explanation) LIKE LOWER(CONCAT('%', :searchQuery, '%')))" +
            "GROUP BY q ORDER BY COUNT(a) DESC")
    Page<Question> findAllMostAnsweredQuestions(Pageable pageable,String searchQuery);

    @Query("SELECT q FROM Question q JOIN User u ON q MEMBER OF u.savedQuestions WHERE u.id = :userId AND q.banned = false AND q.deleted = false " +
            "AND (LOWER(q.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
            "LOWER(q.explanation) LIKE LOWER(CONCAT('%', :searchQuery, '%')))")
    Page<Question> findAllBySavedQuestions(Pageable pageable, Long userId, String searchQuery);

    @Query("SELECT q FROM Question q WHERE q.banned = false AND q.deleted = false AND " +
            "LOWER(q.title) LIKE LOWER(CONCAT('%',:searchQuery,'%')) ")
    List<Question> searchByTitleValidQuestions(String searchQuery, Pageable pageable);


    // count number of upvotes for all question that belongs to a user
    @Query("SELECT COUNT(u) FROM Question q LEFT JOIN q.upvotes u WHERE q.author.id = :userId AND q.banned = false")
    Long countUpvotesOfAllQuestion(Long userId);

    // count views of all questions that belongs to a user
    @Query("SELECT SUM(q.views) FROM Question q WHERE q.author.id = :userId AND q.banned = false")
    Long countViewsOfAllQuestion(Long userId);



    Page<Question> findAllByTags(Set<Tag> tag, Pageable pageable);



}
