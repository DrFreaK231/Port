package com.example.demo.repository;

import com.example.demo.Enums.AuthProviders;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.username = :identifier OR u.email = :identifier")
    User findUser(@Param("identifier") String identifier);

    Optional<User> findByUsernameAndProvider(String username, AuthProviders provider);

}