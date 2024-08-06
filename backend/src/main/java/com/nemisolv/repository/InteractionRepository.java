package com.nemisolv.repository;

import com.nemisolv.entity.Interaction;
import com.nemisolv.entity.Tag;
import com.nemisolv.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface InteractionRepository extends JpaRepository<Interaction,Long> {
    // get interacted tags by user
    @Query("SELECT t FROM Interaction i JOIN i.tags t WHERE i.user.id = :userId GROUP BY t.id ORDER BY COUNT(t.id) DESC")
    Set<Tag> findTagsInteractedByUser(@Param("userId") Long userId);



}
