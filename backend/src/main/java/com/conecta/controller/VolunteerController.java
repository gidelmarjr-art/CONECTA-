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

@Controller("/volunteer")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class VolunteerController {

    private final UserRepository userRepository;
    private final SessionService sessionService;

    public VolunteerController(UserRepository userRepository, SessionService sessionService) {
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

    @Get("/achievements")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getAchievements(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        Databaseconnection user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return HttpResponse.status(HttpStatus.NOT_FOUND, "User not found");
        }

        if (!"VOLUNTEER".equals(user.getRole())) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        List<Map<String, Object>> achievements = List.of(
                Map.of("title", "First volunteer", "description", "Your journey started here!", "xp", 20, "unlocked", true),
                Map.of("title", "Hands on", "description", "5 campaigns completed", "xp", 50, "unlocked", true),
                Map.of("title", "Community leader", "description", "Organized a local event", "xp", 100, "unlocked", true),
                Map.of("title", "Teaching specialist", "description", "50 hours teaching young people", "xp", 150, "unlocked", false)
        );

        Map<String, Object> response = Map.ofEntries(
                Map.entry("level", 4),
                Map.entry("currentXp", 1250),
                Map.entry("nextLevelXp", 2000),
                Map.entry("totalHours", 48),
                Map.entry("totalActions", 12),
                Map.entry("totalNgos", 5),
                Map.entry("achievements", achievements),
                Map.entry("goals", List.of(
                        Map.of("title", "Complete 50 hours", "current", 24, "total", 50),
                        Map.of("title", "Help 5 NGOs", "current", 2, "total", 5)
                )),
                Map.entry("certificates", List.of(
                        Map.of("title", "Teaching Certificate", "organization", "ONG Apoio Jovem", "date", "15/10/2025", "hours", 20),
                        Map.of("title", "Environmental Support", "organization", "Verde Vida", "date", "02/09/2025", "hours", 15),
                        Map.of("title", "Tech Mentorship", "organization", "Code For All", "date", "18/08/2025", "hours", 10)
                ))
        );

        return HttpResponse.ok(response);
    }

    @Get("/vacancies")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getVacancies(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        Databaseconnection user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !"VOLUNTEER".equals(user.getRole())) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        List<Map<String, Object>> vacancies = List.of(
                Map.of("id", 1, "title", "Environmental Educator", "category", "Environment",
                        "description", "We seek passionate volunteers for sustainability to teach recycling and planting workshops for children.",
                        "location", "São Paulo, SP", "type", "Presential"),
                Map.of("id", 2, "title", "Animal Caretaker", "category", "Animal Cause",
                        "description", "Help with feeding, bathing and recreation of rescued dogs and cats waiting for adoption.",
                        "location", "Curitiba, PR", "type", "Presential"),
                Map.of("id", 3, "title", "Computer Instructor", "category", "Education",
                        "description", "Share your knowledge teaching basic computer and internet use for elderly and...",
                        "location", "Remote", "type", "Remote")
        );

        return HttpResponse.ok(Map.of("total", vacancies.size(), "vacancies", vacancies));
    }

    @Get("/inscriptions")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getInscriptions(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        Databaseconnection user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !"VOLUNTEER".equals(user.getRole())) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        List<Map<String, Object>> inscriptions = List.of(
                Map.of("id", 1, "title", "Basic Math Teacher", "description", "School support for 6th to 9th grade on Saturday mornings.",
                        "organization", "Instituto Esperança", "location", "São Paulo, SP (Presential)",
                        "applicationDate", "12/10/2025", "status", "APPROVED"),
                Map.of("id", 2, "title", "Front-end Web Developer", "description", "Creation of landing pages for fundraising campaigns.",
                        "organization", "ONG Code For All", "location", "Remote",
                        "applicationDate", "14/10/2025", "status", "PENDING"),
                Map.of("id", 3, "title", "Clothes Sorting Volunteer", "description", "Organization and separation of winter campaign donations.",
                        "organization", "Ação Solidária de Inverno", "location", "Curitiba, PR (Presential)",
                        "applicationDate", "05/09/2025", "status", "COMPLETED"),
                Map.of("id", 4, "title", "Social Media", "description", "Creation of Instagram posts focused on responsible adoption.",
                        "organization", "Amparo Animal", "location", "Remote",
                        "applicationDate", "01/10/2025", "status", "CANCELLED")
        );

        return HttpResponse.ok(inscriptions);
    }

    @Get("/profile")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getProfile(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();

        }
        Databaseconnection user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !"VOLUNTEER".equals(user.getRole())) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        Map<String, Object> profile = Map.ofEntries(
                Map.entry("name", user.getName() != null ? user.getName() : "User"),
                Map.entry("email", user.getEmail()),
                Map.entry("cpf", user.getCPF()),
                Map.entry("birthDate", "1998-05-20"),
                Map.entry("profession", "Software Engineer"),
                Map.entry("interests", "Education, Environment"),
                Map.entry("bio", "I am passionate about technology and education. I want to use my programming skills to help NGOs expand their digital impact."),
                Map.entry("impact", Map.of("donatedHours", 17, "supportedNgos", 2)),
                Map.entry("contact", Map.of("phone", "(11) 98765-4321")),
                Map.entry("address", Map.of("street", "Rua das Flores", "number", "123", "city", "São Paulo", "state", "SP")),
                Map.entry("history", List.of(
                        Map.of("action", "Career Mentorship", "organization", "Instituto Esperança", "date", "October/2025", "hours", 12),
                        Map.of("action", "Park Cleanup", "organization", "EcoAção", "date", "September/2025", "hours", 5)
                ))
        );

        return HttpResponse.ok(profile);
    }
}