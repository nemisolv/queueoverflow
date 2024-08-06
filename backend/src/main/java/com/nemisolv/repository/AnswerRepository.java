package com.nemisolv.repository;

import com.nemisolv.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {

    @Query("SELECT a FROM Answer a WHERE a.question.id = :questionId AND a.deleted = false AND a.banned = false")
    Page<Answer> findAllByQuestionId(Pageable pageable, Long questionId);


    Page<Answer> findAllByAuthorId(Pageable pageable, Long authorId);

    @Query("SELECT a FROM Answer a LEFT JOIN a.upvotes u LEFT JOIN a.question WHERE  a.question.id = :questionId AND a.banned = false AND a.deleted = false GROUP BY a ORDER BY COUNT(u) DESC")
    Page<Answer> findHighestUpvotesAnswer(Long questionId,Pageable pageable);
    @Query("SELECT a FROM Answer a LEFT JOIN a.upvotes u LEFT JOIN a.question    WHERE a.question.id = :questionId AND  a.banned = false AND a.deleted = false GROUP BY a ORDER BY COUNT(u) ASC")
    Page<Answer> findLowestUpvotesAnswer(Long questionId, Pageable pageable);

    @Query("SELECT a FROM Answer a  WHERE a.banned = false AND a.deleted = false AND LOWER(a.content) LIKE LOWER(CONCAT('%',:searchQuery,'%'))")
    List<Answer> searchByContentValidAnswers(String searchQuery, Pageable pageable);
    @Query("SELECT COUNT(u) FROM Answer a LEFT JOIN a.upvotes u WHERE a.author.id = :userId AND a.banned = false")
    Long countUpvotesOfAllAnswers(Long userId);
}
