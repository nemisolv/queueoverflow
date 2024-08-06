package com.nemisolv.entity;

import com.nemisolv.entity.type.AuthProvider;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDateTime;
import java.util.*;

@Table(name = "users")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, OAuth2User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String accountName;
    private String password;
    @Column(unique = true)
    private String email;
    private String firstName;
    private String lastName;

    //    email verification
    private boolean verified;
//    // this user have already registered but not verified, so other user can register with this email
//    private boolean draft;


    private String picture;

    //    enable 2fa
    private boolean mfaEnabled;
    private String secret;

    private String location;



    @JsonIgnore
    private boolean enabled;


//    // auditor aware
//    @CreatedBy
//    @Column(updatable = false, nullable = false, name = "created_by")
//    private Long createdBy;
//
//    @LastModifiedBy
//
//    @Column(name = "last_modified_by", insertable = false, updatable = true)
//
//    private Long lastModifiedBy;

    private String bio;
    private String portfolioWebsite;
    @Builder.Default
    private int reputation =0;

    @Builder.Default
    @ManyToMany
            (fetch = FetchType.EAGER)
    private Set<Question> savedQuestions = new HashSet<>();

    @ManyToMany(
            fetch = FetchType.EAGER,
            mappedBy = "followers")
    @Builder.Default
    private Set<Tag> followedTags = new HashSet<>();



//    oauth2

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    @Column(name = "provider_id")

    private String providerId;



    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();


    @OneToMany(mappedBy = "user")
    @Builder.Default
    private List<Token> tokens = new ArrayList<>();

    @OneToMany(mappedBy = "author")
    private List<Question> questions;

    @OneToMany(mappedBy = "author")
    private List<Answer> answers;



    @CreatedDate
    @Column(updatable = false, nullable = false, name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate

    @Column(name = "updated_at", insertable = false, updatable = true)

    private LocalDateTime updatedAt;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    public String getUsername() {
        return accountName;
    }


    @Override
    public Map<String, Object> getAttributes() {
        return Map.of("id", id, "username", accountName, "email", email, "firstName", firstName, "lastName", lastName, "verified", verified);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName().name()));
        }
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @PrePersist
    public void prePersist() {
        enabled = true;
        verified = false;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }

    // utility methods
    public void increaseReputation(int amount) {
        reputation += amount;
    }

    public void decreaseReputation(int amount) {
        reputation -= amount;
    }
}
