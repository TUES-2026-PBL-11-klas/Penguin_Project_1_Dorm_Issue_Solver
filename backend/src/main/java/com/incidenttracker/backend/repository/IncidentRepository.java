package com.incidenttracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.incidenttracker.backend.model.Incident;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
