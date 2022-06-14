package com.web.campeonato.domain.repository;

import com.web.campeonato.adapters.api.request.PartidoRequest;
import com.web.campeonato.adapters.api.response.PartidoResponse;
import com.web.campeonato.domain.model.Partido;

import java.util.List;

public interface PartidoRepository {
    List<Partido> getAll();

    List<Partido> get(String fecha);

    void save(PartidoRequest partidoRequest);

    void delete(String fecha);
}
