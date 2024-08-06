package com.nemisolv.repository;

import com.nemisolv.entity.Question;
import com.nemisolv.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByAccountName(String username);

    @Query("SELECT u FROM User u WHERE u.id = ?1 AND u.verified = true AND u.enabled = true")
    Optional<User> getUserShortPreview(Long id);

    @Query("SELECT u FROM User u WHERE u.enabled = true AND (LOWER(u.accountName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) " +
            " OR LOWER(u.firstName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) "
            + " OR LOWER(u.lastName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) "
            +"OR LOWER(u.email) LIKE LOWER(CONCAT('%',:searchQuery,'%')))")
    Page<User> findAllEnabledUsers(Pageable pageable, String searchQuery);

//    @Query("SELECT u FROM User u WHERE u.enabled = true AND u.verified = true")
//    Page<User> findAllEnabledUsers(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.enabled = true AND u.verified = true AND (LOWER(u.accountName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) " +
            " OR LOWER(u.firstName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) "
            + " OR LOWER(u.lastName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) "
            +"OR LOWER(u.email) LIKE LOWER(CONCAT('%',:searchQuery,'%'))) ")
    Page<User> findAllEnabled(Pageable pageable, String searchQuery);


    // find user by firstName + lastName has limit

    @Query("SELECT u FROM User u WHERE u.enabled = true AND u.verified = true AND (LOWER(u.firstName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) "
            + " OR LOWER(u.lastName) LIKE LOWER(CONCAT('%',:searchQuery,'%')) )")
    List<User> searchByNameValidUsers(String searchQuery, Pageable pageable);







}
