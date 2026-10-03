package com.example.civicpulsebackend.governance.controller;
import com.example.civicpulsebackend.governance.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/dashboard")
public class DashboardController {
    private final AnalyticsService analytics;
    public DashboardController(AnalyticsService analytics){this.analytics=analytics;}
    @GetMapping("/overview") public Map<String,Object> overview(){return analytics.overview();}
}