package com.example.civicpulsebackend.governance.controller;
import com.example.civicpulsebackend.governance.entity.ServiceRequest;
import com.example.civicpulsebackend.governance.repository.ServiceRequestRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services/requests")
public class ServiceRequestController {
    private final ServiceRequestRepository repository;
    public ServiceRequestController(ServiceRequestRepository repository) { this.repository = repository; }

    @GetMapping public List<ServiceRequest> all() { return repository.findAll(); }
    @PostMapping public ServiceRequest create(@RequestBody ServiceRequest request) {
        if (request.getReferenceNo() == null || request.getReferenceNo().isBlank())
            request.setReferenceNo("SRV-" + (100000 + (int)(Math.random()*899999)));
        if (request.getStatus() == null) request.setStatus("Pending");
        return repository.save(request);
    }
}