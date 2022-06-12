package com.web.campeonato.domain.repository;

import com.web.campeonato.adapters.api.request.PartidoRequest;
import com.web.campeonato.adapters.api.response.PartidoResponse;
import com.web.campeonato.domain.model.Partido;

import java.util.List;

public interface PartidoRepository {
    List<Partido> getAll();

    void save(PartidoRequest partidoRequest);
}
