package com.example.civicpulsebackend.citizen.entity;
import jakarta.persistence.*;
import java.util.UUID;

@Entity @Table(name="departments") public class Department {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
    @Column(unique=true) private String name;
    private String code;
    private String head;
    private String status;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getHead() { return head; }
    public void setHead(String head) { this.head = head; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}