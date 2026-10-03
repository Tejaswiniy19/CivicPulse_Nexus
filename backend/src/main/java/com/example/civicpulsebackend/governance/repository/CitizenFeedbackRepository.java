package com.example.civicpulsebackend.governance.repository;
import com.example.civicpulsebackend.governance.entity.CitizenFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface CitizenFeedbackRepository extends JpaRepository<CitizenFeedback, UUID> {}
