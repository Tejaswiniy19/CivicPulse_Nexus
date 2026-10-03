package com.example.civicpulsebackend.governance.controller;
import com.example.civicpulsebackend.governance.entity.AuditLog;
import com.example.civicpulsebackend.governance.repository.AuditLogRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditController {
    private final AuditLogRepository repository;
    public AuditController(AuditLogRepository repository) { this.repository = repository; }
    @GetMapping public List<AuditLog> all() { return repository.findAll(); }
}