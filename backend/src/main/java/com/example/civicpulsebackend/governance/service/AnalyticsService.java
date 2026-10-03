package com.example.civicpulsebackend.governance.service;

import com.example.civicpulsebackend.citizen.repository.CitizenRepository;
import com.example.civicpulsebackend.citizen.repository.DepartmentRepository;
import com.example.civicpulsebackend.citizen.repository.GrievanceRepository;
import com.example.civicpulsebackend.governance.entity.BudgetAllocation;
import com.example.civicpulsebackend.governance.repository.*;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {
    private final CitizenRepository citizens;
    private final DepartmentRepository departments;
    private final GrievanceRepository grievances;
    private final ServiceRequestRepository services;
    private final CitizenFeedbackRepository feedback;
    private final RevenueTransactionRepository revenue;
    private final BudgetAllocationRepository budgets;

    public AnalyticsService(CitizenRepository citizens, DepartmentRepository departments, GrievanceRepository grievances,
                            ServiceRequestRepository services, CitizenFeedbackRepository feedback,
                            RevenueTransactionRepository revenue, BudgetAllocationRepository budgets) {
        this.citizens=citizens; this.departments=departments; this.grievances=grievances;
        this.services=services; this.feedback=feedback; this.revenue=revenue; this.budgets=budgets;
    }

    public Map<String,Object> overview() {
        var serviceRows=services.findAll();
        var grievanceRows=grievances.findAll();
        var feedbackRows=feedback.findAll();
        var revenueRows=revenue.findAll();
        var budgetRows=budgets.findAll();

        double satisfaction=feedbackRows.stream().mapToDouble(f->f.getRating()).average().orElse(0);
        long onTime=serviceRows.stream().filter(s->s.getProcessingDays()<=s.getSlaDays()).count();
        double sla=serviceRows.isEmpty()?0:Math.round(onTime*1000.0/serviceRows.size())/10.0;
        double collected=revenueRows.stream().filter(r->!"Failed".equalsIgnoreCase(r.getStatus())).mapToDouble(r->r.getAmount()).sum();
        double allocated=budgetRows.stream().mapToDouble(BudgetAllocation::getAllocated).sum();
        double utilized=budgetRows.stream().mapToDouble(BudgetAllocation::getUtilized).sum();
        double utilization=allocated==0?0:Math.round(utilized*1000.0/allocated)/10.0;

        Map<String,Object> out=new LinkedHashMap<>();
        out.put("citizenSatisfaction", round(satisfaction,2));
        out.put("slaCompliance", sla);
        out.put("revenueCollected", collected);
        out.put("totalRequests", serviceRows.size());
        out.put("resolvedRequests", serviceRows.stream().filter(s->"Resolved".equalsIgnoreCase(s.getStatus())||"Approved".equalsIgnoreCase(s.getStatus())).count());
        out.put("budgetUtilization", utilization);
        out.put("totalGrievances", grievanceRows.size());
        out.put("openGrievances", grievanceRows.stream().filter(g->!"Resolved".equalsIgnoreCase(g.getStatus())).count());
        out.put("resolvedGrievances", grievanceRows.stream().filter(g->"Resolved".equalsIgnoreCase(g.getStatus())).count());
        out.put("departments", departments.count());
        out.put("citizens", citizens.count());
        out.put("serviceTrend", serviceRows.stream().collect(Collectors.groupingBy(s->s.getCreatedAt().getMonth().toString(),LinkedHashMap::new,Collectors.counting())).entrySet().stream().map(e->Map.of("label",e.getKey().substring(0,3),"requests",e.getValue(),"resolved",serviceRows.stream().filter(s->s.getCreatedAt().getMonth().toString().equals(e.getKey()) && ("Resolved".equalsIgnoreCase(s.getStatus())||"Approved".equalsIgnoreCase(s.getStatus()))).count())).toList());
        out.put("grievanceTrend", grievanceRows.stream().collect(Collectors.groupingBy(g->g.getCreatedAt().getMonth().toString(),LinkedHashMap::new,Collectors.counting())).entrySet().stream().map(e->Map.of("label",e.getKey().substring(0,3),"count",e.getValue())).toList());
        out.put("revenueTrend", revenueRows.stream().collect(Collectors.groupingBy(r->r.getPaymentDate().getMonth().toString(),LinkedHashMap::new,Collectors.summingDouble(r->r.getAmount()))).entrySet().stream().map(e->Map.of("label",e.getKey().substring(0,3),"amount",e.getValue())).toList());

        List<Map<String,Object>> perf=new ArrayList<>();
        departments.findAll().forEach(d->{
            var ds=serviceRows.stream().filter(s->d.getName().equalsIgnoreCase(s.getDepartment())).toList();
            var dg=grievanceRows.stream().filter(g->d.getName().equalsIgnoreCase(g.getDepartment())).toList();
            var df=feedbackRows.stream().filter(f->d.getName().equalsIgnoreCase(f.getDepartment())).mapToDouble(f->f.getRating()).average().orElse(0);
            double dp=ds.isEmpty()?0:Math.round(ds.stream().filter(s->s.getProcessingDays()<=s.getSlaDays()).count()*1000.0/ds.size())/10.0;
            perf.add(Map.of("department",d.getName(),"sla",dp,"satisfaction",round(df,2),"requests",ds.size(),"complaints",dg.size()));
        });
        out.put("departmentPerformance",perf);
        out.put("budget",budgetRows.stream().map(b->Map.of("department",b.getDepartment(),"allocated",b.getAllocated(),"utilized",b.getUtilized())).toList());
        return out;
    }
    private double round(double n,int scale){double p=Math.pow(10,scale);return Math.round(n*p)/p;}
}