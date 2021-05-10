package com.example.rest.repo;

import com.example.rest.domain.SocialNetwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialNetworkRepo extends JpaRepository<SocialNetwork, String> {

}
