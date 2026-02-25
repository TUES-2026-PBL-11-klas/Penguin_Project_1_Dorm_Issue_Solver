// controller/IncidentController.java
package com.incidenttracker.backend.controller;

import com.incidenttracker.backend.dto.*;
import com.incidenttracker.backend.model.enums.Priority;
import com.incidenttracker.backend.model.enums.Status;
import com.incidenttracker.backend.service.IncidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController // Казва на Spring: тази класа обработва HTTP заявки и връща JSON
@RequestMapping("/api/incidents") // базовия URL за всички endpoints в този контролер
@CrossOrigin(origins = "*") // Позволява заявки от frontend (React) – важно!
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    // POST /api/incidents
    // Студент създава нов инцидент
    // Използваме @RequestParam защото изпращаме multipart/form-data (заради снимката)
    @PostMapping
    public ResponseEntity<IncidentResponse> createIncident(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("priority") Priority priority,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("studentId") Long studentId,       // временно – после идва от JWT token
            @RequestParam("studentName") String studentName  // временно – после идва от JWT token
    ) throws IOException {

        IncidentCreateRequest request = new IncidentCreateRequest();
        request.setTitle(title);
        request.setDescription(description);
        request.setPriority(priority);

        IncidentResponse response = incidentService.createIncident(request, image, studentId, studentName);
        return ResponseEntity.ok(response);
    }

    // GET /api/incidents/student/{studentId}
    // Всички инциденти на конкретен студент
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<IncidentResponse>> getStudentIncidents(@PathVariable Long studentId) {
        return ResponseEntity.ok(incidentService.getStudentIncidents(studentId));
    }

    // GET /api/incidents/student/{studentId}/stats
    // Статистика за student dashboard
    @GetMapping("/student/{studentId}/stats")
    public ResponseEntity<DashboardStatsResponse> getStudentStats(@PathVariable Long studentId) {
        return ResponseEntity.ok(incidentService.getStudentStats(studentId));
    }

    // GET /api/incidents/{id}
    // Детайли за конкретен инцидент (student или admin)
    @GetMapping("/{id}")
    public ResponseEntity<IncidentResponse> getIncidentById(@PathVariable Long id) {
        return ResponseEntity.ok(incidentService.getIncidentById(id));
    }

    // GET /api/incidents/admin/all
    // Всички инциденти (само за admin)
    @GetMapping("/admin/all")
    public ResponseEntity<List<IncidentResponse>> getAllIncidents() {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    // GET /api/incidents/admin/stats
    // Статистика за admin dashboard
    @GetMapping("/admin/stats")
    public ResponseEntity<DashboardStatsResponse> getAdminStats() {
        return ResponseEntity.ok(incidentService.getAdminStats());
    }

    // PATCH /api/incidents/{id}/status
    // Admin променя статус на инцидент
    @PatchMapping("/{id}/status")
    public ResponseEntity<IncidentResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam Status newStatus
    ) {
        return ResponseEntity.ok(incidentService.updateStatus(id, newStatus));
    }
}
