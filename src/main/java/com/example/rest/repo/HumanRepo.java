package com.example.rest.repo;

import com.example.rest.domain.Human;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HumanRepo extends JpaRepository<Human, Long> {
}
