package com.example.civicpulsebackend.citizen.controller;
import com.example.civicpulsebackend.citizen.entity.Citizen;
import com.example.civicpulsebackend.citizen.repository.CitizenRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController @RequestMapping("/api/citizens")
public class CitizenController {
    private final CitizenRepository repository;
    public CitizenController(CitizenRepository repository){this.repository=repository;}
    @GetMapping public List<Citizen> getAll(){return repository.findAll();}
    @PostMapping public Citizen create(@RequestBody Citizen entity){if(entity.getStatus()==null)entity.setStatus("Active");return repository.save(entity);}
    @PutMapping("/{id}") public Citizen update(@PathVariable UUID id,@RequestBody Citizen body){body.setId(id);return repository.save(body);}
    @DeleteMapping("/{id}") public void delete(@PathVariable UUID id){repository.deleteById(id);}
}