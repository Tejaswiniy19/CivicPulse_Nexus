package com.example.civicpulsebackend.governance.repository;
import com.example.civicpulsebackend.governance.entity.RevenueTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface RevenueTransactionRepository extends JpaRepository<RevenueTransaction, UUID> {}
