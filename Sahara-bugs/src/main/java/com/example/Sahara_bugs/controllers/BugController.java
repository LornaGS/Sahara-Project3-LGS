package com.legacy.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.legacy.demo.dto.BugDTO;
import com.legacy.demo.entities.Bug;
import com.legacy.demo.services.BugService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BugController {

    @Autowired
    private BugService bugService;

    // CREATE
    @PostMapping("/bug/add")
    public ResponseEntity<BugDTO> addBug(@RequestBody Bug bug) {
        return bugService.addBug(bug);
    }

    // READ
    @GetMapping("/bugs")
    public List<BugDTO> getAllBugs() {
        return bugService.getAllBugs();
    }

    @GetMapping("/bug/{id}")
    public ResponseEntity<BugDTO> getBug(@PathVariable Integer id) {
        return bugService.getBug(id);
    }

    // UPDATE
    @PatchMapping("/bug/update/{id}")
    public ResponseEntity<BugDTO> updateBug(@PathVariable Integer id, @RequestBody Bug bugUpdate) {
        return bugService.updateBug(id, bugUpdate);
    }

    // DELETE
    @DeleteMapping("/bug/remove/{id}")
    public ResponseEntity<?> removeBug(@PathVariable Integer id) {
        return bugService.deleteBug(id);
    }
}
