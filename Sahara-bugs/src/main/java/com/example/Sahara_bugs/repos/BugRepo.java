package com.example.Sahara_bugs.repos;

import com.example.Sahara_bugs.entities.Bug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BugRepo extends JpaRepository<Bug, Integer> {
}
