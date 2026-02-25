// dto/DashboardStatsResponse.java
// Статистиката за двата dashboard-а
package com.incidenttracker.backend.dto;

public class DashboardStatsResponse {
    private long totalIncidents;
    private long notStarted;
    private long inProgress;
    private long finished;

    public DashboardStatsResponse(long total, long notStarted, long inProgress, long finished) {
        this.totalIncidents = total;
        this.notStarted = notStarted;
        this.inProgress = inProgress;
        this.finished = finished;
    }

    public long getTotalIncidents() { return totalIncidents; }
    public long getNotStarted() { return notStarted; }
    public long getInProgress() { return inProgress; }
    public long getFinished() { return finished; }
}