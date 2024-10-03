package com.example.Sahara_bugs.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

@Entity
public class Bug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String severity; // e.g., LOW, MEDIUM, HIGH
    private String status;   // e.g., OPEN, IN_PROGRESS, CLOSED
    private String reporter; // e.g., name of the person who reported
    private String assignee; // e.g., name of the person assigned to fix the bug

    @Column(nullable = false, updatable = false)  // Ensure it is not null and can't be updated
    private LocalDateTime dateReported;  // Added field for date and time of bug reporting

    // Default constructor
    public Bug() {
        this.dateReported = LocalDateTime.now();  // Automatically set date when bug is created
    }

    // Constructor for creating a new Bug
    public Bug(String title, String description, String severity, String status, String reporter, String assignee) {
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.reporter = reporter;
        this.assignee = assignee;
        this.dateReported = LocalDateTime.now();  // Set dateReported during bug creation
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public LocalDateTime getDateReported() {
        return dateReported;
    }

    public void setDateReported(LocalDateTime dateReported) {
        this.dateReported = dateReported;
    }
}
