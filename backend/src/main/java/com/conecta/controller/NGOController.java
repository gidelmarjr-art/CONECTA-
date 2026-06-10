package com.conecta.controller;

import com.conecta.DTO.NGO;
import com.conecta.entities.NGOData;
import com.conecta.entities.Vacancy;
import com.conecta.repositories.NGORepository;
import com.conecta.repositories.VacancyRepository;
import com.conecta.service.SessionService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;

@Controller("/api/ngos")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class NGOController {

    private final NGORepository ngoRepository;
    private final VacancyRepository vacancyRepository;
    private final SessionService sessionService;

    public NGOController(NGORepository ngoRepository, VacancyRepository vacancyRepository, SessionService sessionService) {
        this.ngoRepository = ngoRepository;
        this.vacancyRepository = vacancyRepository;
        this.sessionService = sessionService;
    }

    private String getEmailFromSession(String sessionToken) {
        String data = sessionService.validateSessionToken(sessionToken);

        System.out.println("Session data: " + data);

        if (data == null || !data.contains("|")) {
            return null;
        }

        return data.split("\\|")[0];
    }

    //rata pra visao geral
    @Get("/dashboard")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getDashboard(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        NGOData ngo = ngoRepository.findByEmail(email).orElse(null);

        if (ngo == null) {
            return HttpResponse.notFound();
        }

        String cnpj = ngo.getCnpj();
        List<Vacancy> allVacancies = vacancyRepository.findByOngCnpj(cnpj);
        long openVacancies = allVacancies.stream().filter(v -> true).count();
        long activeVolunteers = 120;
        double donationsReceived = 5000.0;
        long volunteerHours = 1200;

        List<Map<String, Object>> donationHistory = List.of(
                Map.of("month", "Mar", "amount", 150),
                Map.of("month", "Abr", "amount", 300),
                Map.of("month", "Mai", "amount", 250),
                Map.of("month", "Jun", "amount", 600),
                Map.of("month", "Jul", "amount", 400),
                Map.of("month", "Ago", "amount", 550),
                Map.of("month", "Set", "amount", 450)
        );

        List<Map<String, String>> openVacanciesList = allVacancies.stream()
                .map(v -> Map.of("title", v.getTitle(), "hours", v.getSupplement() != null ? v.getSupplement() : "N/A"))
                .toList();

        List<String> topCauses = List.of("Educação Infantil", "Saúde Comunitária", "Reflorestamento Local");

        List<Map<String, String>> recentActivities = List.of(
                Map.of("type", "Nova Candidatura", "description", "João Silva se candidatou à vaga.", "date", "Hoje"),
                Map.of("type", "Doação Recebida", "description", "Você recebeu uma doação de R$ 50,00.", "date", "Ontem")
        );

        Map<String, Object> dashboard = Map.of(
                "activeVolunteers", activeVolunteers,
                "openVacancies", openVacancies,
                "donationsReceived", donationsReceived,
                "volunteerHours", volunteerHours,
                "donationHistory", donationHistory,
                "openVacanciesList", openVacanciesList,
                "topCauses", topCauses,
                "recentActivities", recentActivities
        );

        return HttpResponse.ok(dashboard);
    }

    //rota pras vagas
    @Get("/vacancies")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> listVacancies(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        NGOData ngo = ngoRepository.findByEmail(email).orElse(null);

        if (ngo == null) {
            return HttpResponse.notFound();
        }

        List<Vacancy> vacancies = vacancyRepository.findByOngCnpj(ngo.getCnpj());
        return HttpResponse.ok(vacancies);
    }

    @Post("/vacancies")
    @Transactional
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> createVacancy(@Body Vacancy vacancy, @CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        NGOData ngo = ngoRepository.findByEmail(email).orElse(null);

        if (ngo == null) {
            return HttpResponse.notFound();
        }

        vacancy.setOngname(ngo.getName());
        vacancy.setOngCnpj(ngo.getCnpj());
        Vacancy saved = vacancyRepository.save(vacancy);
        return HttpResponse.created(saved);
    }

    //rota de lista de convidados
    @Get("/vacancies/{id}/candidates")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> listCandidates(@PathVariable Integer id, @CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        List<Map<String, Object>> mockCandidates = List.of(
                Map.of("name", "Ana Beatriz Silva", "match", 95, "status", "PENDENTE",
                        "skills", List.of("Matemática", "Didática", "Paciência")),
                Map.of("name", "Carlos Eduardo", "match", 88, "status", "APROVADO",
                        "skills", List.of("Photoshop", "Illustrator"))
        );
        return HttpResponse.ok(mockCandidates);
    }

    //tora de doaçoes
    @Get("/donations")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getDonations(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        Map<String, Object> donations = Map.of(
                "availableBalance", 15700.0,
                "monthlyRaised", 4350.0,
                "campaigns", List.of(
                        Map.of("title", "Campanha de Inverno 2026", "raised", 12500, "goal", 15000, "donors", 145, "daysLeft", 12),
                        Map.of("title", "Reforma da Biblioteca", "raised", 3200, "goal", 10000, "donors", 38, "daysLeft", 45)
                ),
                "recentTransactions", List.of(
                        Map.of("donor", "Marcos Vinícius", "date", "Hoje, 14:30", "amount", 150.00, "type", "entrada"),
                        Map.of("donor", "Ana Beatriz Silva", "date", "Hoje, 09:15", "amount", 50.00, "type", "entrada"),
                        Map.of("donor", "Taxa da Plataforma", "date", "Ontem, 18:00", "amount", 15.00, "type", "saida"),
                        Map.of("donor", "Empresa Parceira S/A", "date", "Ontem, 10:20", "amount", 1000.00, "type", "entrada")
                )
        );
        return HttpResponse.ok(donations);
    }

    //rota dos relatorios
    @Get("/logs")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getReports(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        Map<String, Object> logs = Map.of(
                "totalVolunteers", 342,
                "totalHours", 1250,
                "peopleImpacted", 5000,
                "monthlyVolunteers", List.of(
                        Map.of("month", "Jan", "value", 45),
                        Map.of("month", "Fev", "value", 52),
                        Map.of("month", "Mar", "value", 38),
                        Map.of("month", "Abr", "value", 85),
                        Map.of("month", "Mai", "value", 60),
                        Map.of("month", "Jun", "value", 72)
                ),
                "savedReports", List.of(
                        Map.of("name", "Relatório de Impacto - Q1 2026", "date", "10 Abr 2026", "type", "PDF", "size", "2.4 MB"),
                        Map.of("name", "Horas Voluntárias - Março", "date", "01 Abr 2026", "type", "XLSX", "size", "1.1 MB"),
                        Map.of("name", "Extrato de Doações - Anual", "date", "15 Jan 2026", "type", "PDF", "size", "3.5 MB")
                )
        );
        return HttpResponse.ok(logs);
    }

    //rota pra acessar o prefil
    @Get("/profile")
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> getProfile(@CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        NGOData ngo = ngoRepository.findByEmail(email).orElse(null);
        return ngo != null ? HttpResponse.ok(ngo) : HttpResponse.notFound();
    }

    //atualizaçoes dos dados da ong
    @Put("/profile")
    @Transactional
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> updateProfile(@Body NGOData updatedData, @CookieValue("session_token") String sessionToken) {
        String email = getEmailFromSession(sessionToken);

        if (email == null) {
            return HttpResponse.unauthorized();
        }

        NGOData ngo = ngoRepository.findByEmail(email).orElse(null);

        if (ngo == null) {
            return HttpResponse.notFound();
        }

        if (updatedData.getName() != null) {
            ngo.setName(updatedData.getName());
        }

        if (updatedData.getPhone() != null) {
            ngo.setPhone(updatedData.getPhone());
        }

        if (updatedData.getPublicSpace() != null) {
            ngo.setPublicSpace(updatedData.getPublicSpace());
        }

        if (updatedData.getAddressNumber() != null) {
            ngo.setAddressNumber(updatedData.getAddressNumber());
        }

        if (updatedData.getSupplement() != null) {
            ngo.setSupplement(updatedData.getSupplement());
        }

        if (updatedData.getNeighborhood() != null) {
            ngo.setNeighborhood(updatedData.getNeighborhood());
        }

        if (updatedData.getCity() != null) {
            ngo.setCity(updatedData.getCity());
        }

        if (updatedData.getState() != null) {
            ngo.setState(updatedData.getState());
        }

        if (updatedData.getZipcode() != null) {
            ngo.setZipcode(updatedData.getZipcode());
        }

        if (updatedData.getRepresentativeName() != null) {
            ngo.setRepresentativeName(updatedData.getRepresentativeName());
        }

        if (updatedData.getObjectives() != null) {
            ngo.setObjectives(updatedData.getObjectives());
        }

        if (updatedData.getFundationDate() != null) {
            ngo.setFundationDate(updatedData.getFundationDate());
        }

        ngoRepository.save(ngo);
        return HttpResponse.ok(ngo);
    }
}