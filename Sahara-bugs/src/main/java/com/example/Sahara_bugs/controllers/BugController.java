package com.example.Sahara_bugs.controllers;  // Adjusted package for your controller

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Sahara_bugs.entities.Bug;
import com.example.Sahara_bugs.services.BugService;
import com.example.Sahara_bugs.dtos.BugDto;  // Corrected import path for BugDto

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BugController {

    @Autowired
    private BugService bugService;

    // CREATE
    @PostMapping("/bug/add")
    public ResponseEntity<BugDto> addBug(@RequestBody Bug bug) {
        return bugService.addBug(bug);
    }

    // READ
    @GetMapping("/bugs")
    public List<BugDto> getAllBugs() {
        return bugService.getAllBugs();
    }

    @GetMapping("/bug/{id}")
    public ResponseEntity<BugDto> getBug(@PathVariable Integer id) {
        return bugService.getBug(id);
    }

    // UPDATE
    @PatchMapping("/bug/update/{id}")
    public ResponseEntity<BugDto> updateBug(@PathVariable Integer id, @RequestBody Bug bugUpdate) {
        return bugService.updateBug(id, bugUpdate);
    }

    // DELETE
    @DeleteMapping("/bug/remove/{id}")
    public ResponseEntity<?> removeBug(@PathVariable Integer id) {
        return bugService.deleteBug(id);
    }
}
