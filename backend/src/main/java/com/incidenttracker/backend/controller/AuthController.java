package com.incidenttracker.backend.controller;

import com.incidenttracker.backend.dto.*;
import com.incidenttracker.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@jakarta.validation.Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@jakarta.validation.Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}