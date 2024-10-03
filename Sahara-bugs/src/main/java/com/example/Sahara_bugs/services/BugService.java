package com.example.Sahara_bugs.services;

import com.example.Sahara_bugs.entities.Bug;
import com.example.Sahara_bugs.dtos.BugDto;  // Corrected to BugDto (uppercase B)
import com.example.Sahara_bugs.repos.BugRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BugService {

    @Autowired
    private BugRepo bugRepo;


    private BugDto convertToDTO(Bug bug) {
        return new BugDto(
                bug.getId(),
                bug.getTitle(),
                bug.getDescription(),
                bug.getPriority(),
                bug.getStatus(),
                bug.getReporter(),
                bug.getAssignee(),
                bug.getDateReported()
        );
    }


    public ResponseEntity<BugDto> addBug(Bug newBug) {

        if (newBug.getDateReported() == null) {
            newBug.setDateReported(LocalDateTime.now());
        }
        Bug created = bugRepo.save(newBug);
        return new ResponseEntity<>(convertToDTO(created), HttpStatus.CREATED);
    }


    public List<BugDto> getAllBugs() {
        return bugRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ResponseEntity<BugDto> getBug(Integer id) {
        Optional<Bug> found = bugRepo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(convertToDTO(found.get()));
    }


    public ResponseEntity<BugDto> updateBug(Integer id, Bug bugUpdate) {
        Optional<Bug> found = bugRepo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Bug toUpdate = found.get();
        toUpdate.setTitle(bugUpdate.getTitle());
        toUpdate.setDescription(bugUpdate.getDescription());
        toUpdate.setPriority(bugUpdate.getPriority());
        toUpdate.setStatus(bugUpdate.getStatus());
        toUpdate.setReporter(bugUpdate.getReporter());
        toUpdate.setAssignee(bugUpdate.getAssignee());


        Bug updated = bugRepo.save(toUpdate);
        return ResponseEntity.ok(convertToDTO(updated));
    }


    public ResponseEntity<?> deleteBug(Integer id) {
        Optional<Bug> found = bugRepo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("Bug not found", HttpStatus.NOT_FOUND);
        }
        bugRepo.deleteById(id);
        return ResponseEntity.ok("Bug with id " + id + " has been deleted.");
    }
}
