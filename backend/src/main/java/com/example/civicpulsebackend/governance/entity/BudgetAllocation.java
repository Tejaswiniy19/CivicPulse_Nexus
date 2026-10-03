package com.example.civicpulsebackend.governance.entity;
import jakarta.persistence.*;
import java.util.UUID;

@Entity @Table(name="budget_allocations") public class BudgetAllocation {
    @Id @GeneratedValue(strategy=GenerationType.UUID) private UUID id;
    private String department;
    private double allocated;
    private double utilized;
    private String financialYear;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public double getAllocated() { return allocated; }
    public void setAllocated(double allocated) { this.allocated = allocated; }

    public double getUtilized() { return utilized; }
    public void setUtilized(double utilized) { this.utilized = utilized; }

    public String getFinancialYear() { return financialYear; }
    public void setFinancialYear(String financialYear) { this.financialYear = financialYear; }
}