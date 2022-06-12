package com.web.campeonato.adapters.repository;

import com.web.campeonato.adapters.api.request.PartidoRequest;
import com.web.campeonato.adapters.api.response.PartidoResponse;
import com.web.campeonato.domain.model.Partido;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PartidoRepositoryMyBatis {

    List<Partido> getAll();

    void save(PartidoRequest partidoRequest);
}
