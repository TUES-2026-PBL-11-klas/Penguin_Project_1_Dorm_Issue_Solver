// repository/IncidentRepository.java
package com.incidenttracker.backend.repository;

import com.incidenttracker.backend.model.Incident;
import com.incidenttracker.backend.model.enums.Priority;
import com.incidenttracker.backend.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    // Намери всички инциденти на даден студент, сортирани по приоритет
    // Spring разбира от името на метода какъв SQL да напише!
    List<Incident> findByStudentIdOrderByPriorityAsc(Long studentId);

    // За статистики – брой по статус за даден студент
    long countByStudentIdAndStatus(Long studentId, Status status);

    // За статистики – брой по статус (за admin – всички)
    long countByStatus(Status status);

    // За admin – всички инциденти
    List<Incident> findAllByOrderByPriorityAsc();
}