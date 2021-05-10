package com.example.rest.repo;

import com.example.rest.domain.Act;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActRepo extends JpaRepository<Act, String> {
}
