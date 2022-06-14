package com.web.campeonato.adapters.repository;

import com.web.campeonato.adapters.api.request.PartidoRequest;
import com.web.campeonato.adapters.api.response.PartidoResponse;
import com.web.campeonato.domain.model.Partido;
import com.web.campeonato.domain.repository.PartidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Component
@RequiredArgsConstructor
public class PartidoRepositoryImpl implements PartidoRepository {

    private final PartidoRepositoryMyBatis partidoRepositoryMyBatis;

    @Override
    public List<Partido> getAll() {
        return partidoRepositoryMyBatis.getAll();
    }

    @Override
    public List<Partido> get(String fecha){
        return partidoRepositoryMyBatis.get(fecha);
    }

    @Override
    public void save(PartidoRequest partidoRequest) {
        partidoRepositoryMyBatis.save(partidoRequest);
    }

    @Override
    public void delete(String fecha) { partidoRepositoryMyBatis.delete(fecha);}
}
