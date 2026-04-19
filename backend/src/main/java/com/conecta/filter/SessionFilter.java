package com.conecta.filter;

import com.conecta.service.SessionService;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Filter;
import io.micronaut.http.filter.HttpServerFilter;
import io.micronaut.http.filter.ServerFilterChain;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;
import java.util.Set;

@Filter("/**")
public class SessionFilter implements HttpServerFilter {

    private final SessionService sessionService;

    private static final Set<String> PUBLIC_ROUTES = Set.of(
        "POST /auth/",
        "POST /auth/login",
        "POST /auth/refresh"
    );

    public SessionFilter(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @Override
    public Publisher<MutableHttpResponse<?>> doFilter(HttpRequest<?> request, ServerFilterChain chain) {
        String path = request.getPath();
        String method = request.getMethod().name();
        String routeKey = method + " " + path;

        if (PUBLIC_ROUTES.contains(routeKey) || path.startsWith("/swagger")) {
            return chain.proceed(request);
        }

        String sessionToken = request.getCookies().findCookie("session_token")
                .map(cookie -> cookie.getValue())
                .orElse(null);

        if (sessionToken == null || sessionService.validateSessionToken(sessionToken) == null) {
            return Mono.just(HttpResponse.unauthorized());
        }

        return chain.proceed(request);
    }
}
