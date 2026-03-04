package com.incidenttracker.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.incidenttracker.backend.dto.DashboardStatsResponse;
import com.incidenttracker.backend.dto.IncidentCreateRequest;
import com.incidenttracker.backend.dto.IncidentResponse;
import com.incidenttracker.backend.model.User;
import com.incidenttracker.backend.model.enums.Priority;
import com.incidenttracker.backend.model.enums.Status;
import com.incidenttracker.backend.repository.UserRepository;
import com.incidenttracker.backend.service.IncidentService;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    private final IncidentService incidentService;
    private final UserRepository userRepository;

    public IncidentController(IncidentService incidentService,
                               UserRepository userRepository) {
        this.incidentService = incidentService;
        this.userRepository = userRepository;
    }

    // Помощен метод – взима логнатия User обект от базата
    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Потребителят не е намерен"));
    }

    // POST /api/incidents – студент създава инцидент
    @PostMapping
    public ResponseEntity<IncidentResponse> createIncident(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("priority") Priority priority,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication
    ) throws IOException {
        User user = getAuthenticatedUser(authentication);

        IncidentCreateRequest request = new IncidentCreateRequest();
        request.setTitle(title);
        request.setDescription(description);
        request.setPriority(priority);

        return ResponseEntity.ok(incidentService.createIncident(request, image, user));
    }

    // GET /api/incidents/my – инцидентите на логнатия студент
    @GetMapping("/my")
    public ResponseEntity<List<IncidentResponse>> getMyIncidents(Authentication authentication) {
        return ResponseEntity.ok(
            incidentService.getStudentIncidents(authentication.getName())
        );
    }

    // GET /api/incidents/my/stats – статистика за student dashboard
    @GetMapping("/my/stats")
    public ResponseEntity<DashboardStatsResponse> getMyStats(Authentication authentication) {
        return ResponseEntity.ok(
            incidentService.getStudentStats(authentication.getName())
        );
    }

    // GET /api/incidents/{id} – детайли за инцидент
    @GetMapping("/{id}")
    public ResponseEntity<IncidentResponse> getIncidentById(@PathVariable Long id) {
        return ResponseEntity.ok(incidentService.getIncidentById(id));
    }

    // GET /api/incidents/admin/all – всички инциденти (admin)
    @GetMapping("/admin/all")
    public ResponseEntity<List<IncidentResponse>> getAllIncidents() {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    // GET /api/incidents/admin/stats – статистика (admin)
    @GetMapping("/admin/stats")
    public ResponseEntity<DashboardStatsResponse> getAdminStats() {
        return ResponseEntity.ok(incidentService.getAdminStats());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<IncidentResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam Status newStatus,
            Authentication authentication
    ) {
        // Вземаме ролята на логнатия потребител
        String role = authentication.getAuthorities()
                .iterator().next()
                .getAuthority();

        // Само ROLE_ADMIN може да сменя статус
        if (!role.equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(incidentService.updateStatus(id, newStatus));
}
}