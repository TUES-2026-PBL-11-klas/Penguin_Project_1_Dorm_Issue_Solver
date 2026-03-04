package com.incidenttracker.backend.dto;

public class AuthResponse {
    private String token;
    private String role;
    private String username; // ДОБАВЕНО

    public AuthResponse(String token, String role, String username) { // ДОБАВЕНО
        this.token = token;
        this.role = role;
        this.username = username; // ДОБАВЕНО
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public String getUsername() { return username; } // ДОБАВЕНО
}