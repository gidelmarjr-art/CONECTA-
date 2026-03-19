package com.conecta;

import io.micronaut.http.annotation.Controller;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

@Secured(SecurityRule.IS_ANONYMOUS)
@Controller("/")
public class BackendController {
    /*
    @Get(uri = "/", produces = "text/plain")
    public String index() {
        return "Example Response";
    }

    @Post(uri = "/teste", consumes = MediaType.TEXT_PLAIN, produces = MediaType.TEXT_PLAIN)
    public String resp(@Body String resq) {
        return "Resposta: " + resq;
    }*/
    //@Post(uri="/validarCNPJ", consumes = MediaType.TEXT_PLAIN, produces = MediaType.TEXT_PLAIN)
    //public Boolean Validar(@Body)
}
