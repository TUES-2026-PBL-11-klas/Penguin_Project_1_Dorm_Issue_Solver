package com.incidenttracker.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incidenttracker.backend.model.Incident;
import com.incidenttracker.backend.model.enums.Status;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    // Намери инциденти по username на студента, сортирани по приоритет
    List<Incident> findByUserUsernameOrderByPriorityAsc(String username);

    // Статистики за конкретен студент
    long countByUserUsernameAndStatus(String username, Status status);

    // Статистики за всички (admin)
    long countByStatus(Status status);

    // Всички инциденти сортирани (admin)
    List<Incident> findAllByOrderByPriorityAsc();
}