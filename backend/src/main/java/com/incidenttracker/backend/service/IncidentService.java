// service/IncidentService.java
package com.incidenttracker.backend.service;

import com.incidenttracker.backend.dto.*;
import com.incidenttracker.backend.model.Incident;
import com.incidenttracker.backend.model.enums.Status;
import com.incidenttracker.backend.repository.IncidentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service // Казваме на Spring, че това е service компонент
public class IncidentService {

    private final IncidentRepository incidentRepository;

    // Constructor injection – по-добра практика от @Autowired директно в полето
    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    // Създаване на инцидент
    public IncidentResponse createIncident(IncidentCreateRequest request,
                                           MultipartFile image,
                                           Long studentId,
                                           String studentName) throws IOException {
        Incident incident = new Incident();
        incident.setTitle(request.getTitle());
        incident.setDescription(request.getDescription());
        incident.setPriority(request.getPriority());
        incident.setStatus(Status.NOT_STARTED); // винаги започва като NOT_STARTED
        incident.setCreatedAt(LocalDateTime.now());
        incident.setStudentId(studentId);
        incident.setStudentName(studentName);

        // Обработка на снимката
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            incident.setImageUrl(imageUrl);
        }

        Incident saved = incidentRepository.save(incident);
        return IncidentResponse.fromIncident(saved);
    }

    // Запис на снимката на диска
    private String saveImage(MultipartFile image) throws IOException {
        // Създаваме уникално име за файла за да избегнем конфликти
        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path uploadDir = Paths.get("uploads");

        // Създаваме папката ако не съществува
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Path filePath = uploadDir.resolve(filename);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + filename; // връщаме URL пътя
    }

    // Всички инциденти на даден студент (сортирани по приоритет)
    public List<IncidentResponse> getStudentIncidents(Long studentId) {
        return incidentRepository.findByStudentIdOrderByPriorityAsc(studentId)
                .stream()
                .map(IncidentResponse::fromIncident) // конвертираме всеки Incident → IncidentResponse
                .collect(Collectors.toList());
    }

    // Детайли за конкретен инцидент
    public IncidentResponse getIncidentById(Long id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found with id: " + id));
        return IncidentResponse.fromIncident(incident);
    }

    // Статистика за студент dashboard
    public DashboardStatsResponse getStudentStats(Long studentId) {
        long notStarted = incidentRepository.countByStudentIdAndStatus(studentId, Status.NOT_STARTED);
        long inProgress = incidentRepository.countByStudentIdAndStatus(studentId, Status.IN_PROGRESS);
        long finished = incidentRepository.countByStudentIdAndStatus(studentId, Status.FINISHED);
        long total = notStarted + inProgress + finished;
        return new DashboardStatsResponse(total, notStarted, inProgress, finished);
    }

    // Всички инциденти (за admin)
    public List<IncidentResponse> getAllIncidents() {
        return incidentRepository.findAllByOrderByPriorityAsc()
                .stream()
                .map(IncidentResponse::fromIncident)
                .collect(Collectors.toList());
    }

    // Статистика за admin dashboard
    public DashboardStatsResponse getAdminStats() {
        long notStarted = incidentRepository.countByStatus(Status.NOT_STARTED);
        long inProgress = incidentRepository.countByStatus(Status.IN_PROGRESS);
        long finished = incidentRepository.countByStatus(Status.FINISHED);
        long total = notStarted + inProgress + finished;
        return new DashboardStatsResponse(total, notStarted, inProgress, finished);
    }

    // Промяна на статус (само admin)
    public IncidentResponse updateStatus(Long id, Status newStatus) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found with id: " + id));
        incident.setStatus(newStatus);
        Incident updated = incidentRepository.save(incident);
        return IncidentResponse.fromIncident(updated);
    }
}