package com.incidenttracker.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.incidenttracker.backend.model.Incident;
import com.incidenttracker.backend.repository.IncidentRepository;
import com.incidenttracker.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    private final IncidentRepository repository;
    private final UserRepository userRepository;

    public IncidentController(IncidentRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Incident> getAll() {
        return repository.findAll();
    }

    @GetMapping("/my")
    public List<Incident> getMyIncidents(Authentication authentication) {
        return repository.findByUserUsername(authentication.getName());
    }

    @PostMapping
    public Incident create(@RequestBody Incident incident, Authentication authentication) {
        incident.setUser(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Потребителят не е намерен")));
        return repository.save(incident);
    }
}
