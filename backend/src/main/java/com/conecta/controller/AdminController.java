package com.conecta.controller;

import com.conecta.entities.Databaseconnection;
import com.conecta.repositories.UserRepository;
import com.conecta.service.SessionService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.CookieValue;
import io.micronaut.http.annotation.Get;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import java.util.List;
import java.util.Map;

@Controller("/adm")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class AdminController {

    private final UserRepository userRepository;
    private final SessionService sessionService;

    public AdminController(UserRepository userRepository, SessionService sessionService) {
        this.userRepository = userRepository;
        this.sessionService = sessionService;
    }

    private String getEmailFromSession(String sessionToken) {
        String data = sessionService.validateSessionToken(sessionToken);

        if (data == null || !data.contains("|")) {
            return null;
        }

        return data.split("\\|")[0];
    }

    //rota que retorna os dados do usuario logado
    @Get("/profile")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getProfile(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);
        if (email == null) {
            return HttpResponse.unauthorized();
        }

        Databaseconnection admin = userRepository.findByEmail(email).orElse(null);
        if (admin == null) {
            return HttpResponse.status(HttpStatus.NOT_FOUND, "Admin not found");
        }

        if (!"ADMIN".equals(admin.getRole())) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        Map<String, Object> profile = Map.of(
                "name", admin.getName() != null ? admin.getName() : "Super Administrator",
                "role", admin.getRole(),
                "accessLevel", "Full Access (Level 5)",
                "department", "Technology and Security",
                "activitiesDescription", "Responsible for user moderation, donation auditing, and platform stability maintenance.",
                "contact", Map.of(
                        "email", admin.getEmail() != null ? admin.getEmail() : "admin@conecta.com",
                        "phone", "(11) 9876-4321"
                ),
                "address", Map.of(
                        "street", "Rua das Flores",
                        "number", "123",
                        "zipcode", "12345-678",
                        "city", "São Paulo",
                        "state", "SP"
                ),
                "recentActions", List.of(
                        Map.of(
                                "title", "NGO Approval",
                                "description", "You approved the registration of \"Instituto Esperança\".",
                                "timeAgo", "2 hours ago"
                        ),
                        Map.of(
                                "title", "Report Moderation",
                                "description", "User banned for inappropriate behavior in chat.",
                                "timeAgo", "Yesterday at 14:30"
                        )
                ),
                "quickStats", Map.of(
                        "auditsToday", 12,
                        "pendingReports", 3
                )
        );

        return HttpResponse.ok(profile);
    }
}