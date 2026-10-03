package com.example.civicpulsebackend.citizen.entity;
import jakarta.persistence.*;
import java.util.UUID;

@Entity @Table(name="citizens") public class Citizen {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
    private String name;
    private String status;
    private String phone;
    private String email;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}