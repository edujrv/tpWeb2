package com.web.campeonato.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Partido {
    private Integer id;
    private String fecha;
    private String local;
    private int golesLocal;
    private int golesVisitante;
    private String visitante;
}
