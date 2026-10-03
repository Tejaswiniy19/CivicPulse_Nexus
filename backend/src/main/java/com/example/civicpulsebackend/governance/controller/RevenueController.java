package com.example.civicpulsebackend.governance.controller;
import com.example.civicpulsebackend.governance.entity.RevenueTransaction;
import com.example.civicpulsebackend.governance.repository.RevenueTransactionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/revenue")
public class RevenueController {
    private final RevenueTransactionRepository repository;
    public RevenueController(RevenueTransactionRepository repository) { this.repository = repository; }
    @GetMapping public List<RevenueTransaction> all() { return repository.findAll(); }
    @PostMapping public RevenueTransaction create(@RequestBody RevenueTransaction transaction) { return repository.save(transaction); }
}