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
    private String priority;
    private String status;
    private String reporter;
    private String assignee;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dateReported;


    public Bug() {
        this.dateReported = LocalDateTime.now();
    }


    public Bug(String title, String description, String priority, String status, String reporter, String assignee) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.reporter = reporter;
        this.assignee = assignee;
        this.dateReported = LocalDateTime.now();  // Set dateReported during bug creation
    }


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

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
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
