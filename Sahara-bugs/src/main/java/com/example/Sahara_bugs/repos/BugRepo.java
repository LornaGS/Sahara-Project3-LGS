package com.legacy.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.legacy.demo.entities.Bug;

@Repository
public interface BugRepo extends JpaRepository<Bug, Integer> {
}
