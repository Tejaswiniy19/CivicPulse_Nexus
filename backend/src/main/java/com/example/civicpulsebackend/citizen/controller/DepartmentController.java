package com.example.civicpulsebackend.citizen.controller;
import com.example.civicpulsebackend.citizen.entity.Department;
import com.example.civicpulsebackend.citizen.repository.DepartmentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController @RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentRepository repository;
    public DepartmentController(DepartmentRepository repository){this.repository=repository;}
    @GetMapping public List<Department> getAll(){return repository.findAll();}
    @PostMapping public Department create(@RequestBody Department entity){if(entity.getStatus()==null)entity.setStatus("Active");return repository.save(entity);}
    @PutMapping("/{id}") public Department update(@PathVariable UUID id,@RequestBody Department body){body.setId(id);return repository.save(body);}
}