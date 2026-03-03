package com.incidenttracker.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.incidenttracker.backend.dto.DashboardStatsResponse;
import com.incidenttracker.backend.dto.IncidentCreateRequest;
import com.incidenttracker.backend.dto.IncidentResponse;
import com.incidenttracker.backend.model.Incident;
import com.incidenttracker.backend.model.User;
import com.incidenttracker.backend.model.enums.Status;
import com.incidenttracker.backend.repository.IncidentRepository;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public IncidentResponse createIncident(IncidentCreateRequest request,
                                           MultipartFile image,
                                           User user) throws IOException {
        Incident incident = new Incident();
        incident.setTitle(request.getTitle());
        incident.setDescription(request.getDescription());
        incident.setPriority(request.getPriority());
        incident.setUser(user); // директно слагаме User обекта

        if (image != null && !image.isEmpty()) {
            incident.setImageUrl(saveImage(image));
        }

        return IncidentResponse.fromIncident(incidentRepository.save(incident));
    }

    private String saveImage(MultipartFile image) throws IOException {
        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);
        Files.copy(image.getInputStream(), uploadDir.resolve(filename),
                StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/" + filename;
    }

    public List<IncidentResponse> getStudentIncidents(String username) {
        return incidentRepository.findByUserUsernameOrderByPriorityAsc(username)
                .stream()
                .map(IncidentResponse::fromIncident)
                .collect(Collectors.toList());
    }

    public IncidentResponse getIncidentById(Long id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Инцидентът не е намерен: " + id));
        return IncidentResponse.fromIncident(incident);
    }

    public DashboardStatsResponse getStudentStats(String username) {
        long notStarted = incidentRepository.countByUserUsernameAndStatus(username, Status.NOT_STARTED);
        long inProgress = incidentRepository.countByUserUsernameAndStatus(username, Status.IN_PROGRESS);
        long finished   = incidentRepository.countByUserUsernameAndStatus(username, Status.FINISHED);
        return new DashboardStatsResponse(notStarted + inProgress + finished,
                                          notStarted, inProgress, finished);
    }

    public List<IncidentResponse> getAllIncidents() {
        return incidentRepository.findAllByOrderByPriorityAsc()
                .stream()
                .map(IncidentResponse::fromIncident)
                .collect(Collectors.toList());
    }

    public DashboardStatsResponse getAdminStats() {
        long notStarted = incidentRepository.countByStatus(Status.NOT_STARTED);
        long inProgress = incidentRepository.countByStatus(Status.IN_PROGRESS);
        long finished   = incidentRepository.countByStatus(Status.FINISHED);
        return new DashboardStatsResponse(notStarted + inProgress + finished,
                                          notStarted, inProgress, finished);
    }

    public IncidentResponse updateStatus(Long id, Status newStatus) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Инцидентът не е намерен: " + id));
        incident.setStatus(newStatus);
        return IncidentResponse.fromIncident(incidentRepository.save(incident));
    }
}