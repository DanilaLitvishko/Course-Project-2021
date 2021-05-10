package com.example.rest.repo;

import com.example.rest.domain.Output;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutputRepo extends JpaRepository<Output, String> {
}
