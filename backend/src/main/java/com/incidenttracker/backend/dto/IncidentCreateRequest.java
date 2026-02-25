// dto/IncidentCreateRequest.java
// Това получаваме от frontend при създаване на инцидент
package com.incidenttracker.backend.dto;

import com.incidenttracker.backend.model.enums.Priority;

public class IncidentCreateRequest {
    private String title;
    private String description;
    private Priority priority;
    // imageUrl се обработва отделно (file upload)

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
}