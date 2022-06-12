package com.web.campeonato.adapters.api.response;

import com.web.campeonato.domain.model.Partido;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PartidoResponse {
//    private String fecha; ACA LA FECHA NO HARIA FALTA MEPA
    private String local;
    private String visitante;
    private int golesLocal;
    private int golesVisitante;

    public static PartidoResponse build(Partido partido){
        return PartidoResponse.builder()
                .local(partido.getLocal())
                .visitante(partido.getVisitante())
                .golesLocal(partido.getGolesLocal())
                .golesVisitante(partido.getGolesVisitante())
                .build();
    }
}
