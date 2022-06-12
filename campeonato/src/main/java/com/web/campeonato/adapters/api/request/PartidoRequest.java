package com.web.campeonato.adapters.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PartidoRequest {
    private String fecha;
    private String local;
    private String visitante;
    private int golesLocal;
    private int golesVisitante;
}
