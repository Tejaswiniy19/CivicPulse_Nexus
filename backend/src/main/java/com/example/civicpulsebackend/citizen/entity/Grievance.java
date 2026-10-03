package com.example.civicpulsebackend.citizen.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity @Table(name="grievances") public class Grievance {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
    @Column(unique=true, nullable=false) private String referenceNo;
    private String citizenName;
    private String department;
    private String category;
    private String priority;
    @Column(length=2000) private String description;
    private String status;
    private int slaDays;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    @PrePersist void onCreate() {
        if(createdAt==null) createdAt=LocalDateTime.now();
        if(status==null) status="Pending";
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getReferenceNo() { return referenceNo; }
    public void setReferenceNo(String referenceNo) { this.referenceNo = referenceNo; }

    public String getCitizenName() { return citizenName; }
    public void setCitizenName(String citizenName) { this.citizenName = citizenName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getSlaDays() { return slaDays; }
    public void setSlaDays(int slaDays) { this.slaDays = slaDays; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}