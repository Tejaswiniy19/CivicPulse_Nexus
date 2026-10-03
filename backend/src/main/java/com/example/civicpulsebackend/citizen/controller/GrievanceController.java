package com.example.civicpulsebackend.citizen.controller;
import com.example.civicpulsebackend.citizen.entity.Grievance;
import com.example.civicpulsebackend.citizen.repository.GrievanceRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/grievances")
public class GrievanceController {
    private final GrievanceRepository repository;
    public GrievanceController(GrievanceRepository repository){this.repository=repository;}
    @GetMapping public List<Grievance> getAll(){return repository.findAll();}
    @PostMapping public Grievance create(@RequestBody Grievance entity){
        if(entity.getReferenceNo()==null||entity.getReferenceNo().isBlank())entity.setReferenceNo("GRV-"+(100000+(int)(Math.random()*899999)));
        if(entity.getStatus()==null)entity.setStatus("Pending");
        return repository.save(entity);
    }
}