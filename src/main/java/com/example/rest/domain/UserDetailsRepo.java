package com.example.rest.repo;

import com.example.rest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepo extends JpaRepository <User, String> {
}
