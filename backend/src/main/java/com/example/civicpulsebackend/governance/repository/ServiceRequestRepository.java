package com.example.civicpulsebackend.governance.repository;
import com.example.civicpulsebackend.governance.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, UUID> {}
