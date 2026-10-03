package com.example.civicpulsebackend.governance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "citizen_feedback")
public class CitizenFeedback {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String citizenName;
    private String department;
    private String serviceType;
    private double rating;
    private String comment;
    private LocalDateTime submittedAt;

    @PrePersist
    void onCreate() { if (submittedAt == null) submittedAt = LocalDateTime.now(); }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getCitizenName() { return citizenName; }
    public void setCitizenName(String citizenName) { this.citizenName = citizenName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}