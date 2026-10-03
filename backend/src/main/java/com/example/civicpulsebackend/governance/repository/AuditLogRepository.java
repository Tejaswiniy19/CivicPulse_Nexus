package com.example.civicpulsebackend.governance.repository;
import com.example.civicpulsebackend.governance.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {}
