package com.example.Sahara_bugs.dtos;

import java.time.LocalDateTime;

public class BugDto {
    private Integer id;
    private String title;
    private String description;
    private String severity;
    private String status;
    private String reporter;
    private String assignee;
    private LocalDateTime dateReported;


    public BugDto() {}


    public BugDto(Integer id, String title, String description, String severity, String status, String reporter, String assignee, LocalDateTime dateReported) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.reporter = reporter;
        this.assignee = assignee;
        this.dateReported = dateReported;  
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
