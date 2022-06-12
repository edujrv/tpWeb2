package com.web.campeonato.domain.service;

import com.web.campeonato.adapters.api.request.PartidoRequest;
import com.web.campeonato.adapters.api.response.PartidoResponse;
import com.web.campeonato.domain.model.Partido;
import com.web.campeonato.domain.repository.PartidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
@RequiredArgsConstructor
public class PartidoService {

    private final PartidoRepository partidoRepository;

    public List<Partido> getAll(){
        return  partidoRepository.getAll();
    }

    public void save(PartidoRequest partidoRequest){
        partidoRepository.save(partidoRequest);
    }
}
