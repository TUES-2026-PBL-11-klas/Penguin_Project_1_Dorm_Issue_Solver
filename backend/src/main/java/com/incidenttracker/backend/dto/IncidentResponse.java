// dto/IncidentResponse.java
// Това изпращаме КЪМ frontend
package com.incidenttracker.backend.dto;

import java.time.LocalDateTime;

import com.incidenttracker.backend.model.Incident;
import com.incidenttracker.backend.model.enums.Priority;
import com.incidenttracker.backend.model.enums.Status;

public class IncidentResponse {
    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private Status status;
    private String imageUrl;
    private LocalDateTime createdAt;
    private Long studentId;
    private String studentName;

    // Static factory метод – удобен начин да конвертираме от Incident към IncidentResponse
    public static IncidentResponse fromIncident(Incident incident) {
        IncidentResponse response = new IncidentResponse();
        response.id = incident.getId();
        response.title = incident.getTitle();
        response.description = incident.getDescription();
        response.priority = incident.getPriority();
        response.status = incident.getStatus();
        response.imageUrl = incident.getImageUrl();
        response.createdAt = incident.getCreatedAt();
        // вземаме данните от User обекта
        if (incident.getUser() != null) {
            response.studentId = incident.getUser().getId();
            response.studentName = incident.getUser().getUsername();
        }
        return response;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public Priority getPriority() { return priority; }
    public Status getStatus() { return status; }
    public String getImageUrl() { return imageUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
}