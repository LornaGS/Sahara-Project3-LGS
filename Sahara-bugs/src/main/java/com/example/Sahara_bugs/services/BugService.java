package com.legacy.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.legacy.demo.dto.BugDTO;
import com.legacy.demo.entities.Bug;
import com.legacy.demo.repos.BugRepo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BugService {

    @Autowired
    private BugRepo bugRepo;

    // Utility method to convert Entity to DTO
    private BugDTO convertToDTO(Bug bug) {
        return new BugDTO(
                bug.getId(),
                bug.getTitle(),
                bug.getDescription(),
                bug.getSeverity(),
                bug.getStatus(),
                bug.getReporter(),
                bug.getAssignee()
        );
    }

    // CREATE
    public ResponseEntity<BugDTO> addBug(Bug newBug) {
        Bug created = bugRepo.save(newBug);
        return new ResponseEntity<>(convertToDTO(created), HttpStatus.CREATED);
    }

    // READ
    public List<BugDTO> getAllBugs() {
        return bugRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ResponseEntity<BugDTO> getBug(Integer id) {
        Optional<Bug> found = bugRepo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(convertToDTO(found.get()));
    }

    // UPDATE
    public ResponseEntity<BugDTO> updateBug(Integer id, Bug bugUpdate) {
        Optional<Bug> found = bugRepo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Bug toUpdate = found.get();
        toUpdate.setTitle(bugUpdate.getTitle());
        toUpdate.setDescription(bugUpdate.getDescription());
        toUpdate.setSeverity(bugUpdate.getSeverity());
        toUpdate.setStatus(bugUpdate.getStatus());
        toUpdate.setReporter(bugUpdate.getReporter());
        toUpdate.setAssignee(bugUpdate.getAssignee());

        Bug updated = bugRepo.save(toUpdate);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    // DELETE
    public ResponseEntity<?> deleteBug(Integer id) {
        Optional<Bug> found = bugRepo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("Bug not found", HttpStatus.NOT_FOUND);
        }
        bugRepo.deleteById(id);
        return ResponseEntity.ok("Bug with id " + id + " has been deleted.");
    }
}
