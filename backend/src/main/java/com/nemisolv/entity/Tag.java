package com.nemisolv.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "tags")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String name;

//    @Column(nullable = false)
    private String description;

    @ManyToMany(mappedBy = "tags")
    private Set<Question> questions;

    @ManyToMany
    @JoinTable(name = "tag_followers",
            joinColumns = @JoinColumn(name = "tag_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> followers;

    public Tag(String name) {
        this.name= name;
    }

}