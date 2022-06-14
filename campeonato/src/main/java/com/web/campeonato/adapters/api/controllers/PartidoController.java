package com.web.campeonato.adapters.api.controllers;

import com.web.campeonato.adapters.api.request.PartidoRequest;
import com.web.campeonato.adapters.api.response.PartidoResponse;
import com.web.campeonato.domain.model.Partido;
import com.web.campeonato.domain.service.PartidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
public class PartidoController {

    private final PartidoService partidoService;

    @CrossOrigin(origins = "*")
    @GetMapping("/getAll")
    public List<PartidoResponse> getAll(){
        List<Partido> partidos = partidoService.getAll();
        List<PartidoResponse> partidoResponses = new ArrayList<>();

        for (Partido partido:
             partidos) {
            partidoResponses.add(PartidoResponse.build(partido));
        }
        return partidoResponses;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/get/{fecha}")
    public List<PartidoResponse> get(
            @PathVariable(name = "fecha") String fecha) {

        List<Partido> partidos = partidoService.get(fecha);
        List<PartidoResponse> partidoResponses = new ArrayList<>();

        for (Partido partido:
                partidos) {
            partidoResponses.add(PartidoResponse.build(partido));
        }
        return partidoResponses;
    }
    
//    @PostMapping("/save")
//    public void save(
//            @RequestBody PartidoRequest partidoRequest
//            ){
//        partidoService.save(partidoRequest);
//    }

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public void save(
            @RequestBody List<PartidoRequest> partidoRequests
    ){
        for (PartidoRequest partidoRequest :
               partidoRequests ) {
            partidoService.save(partidoRequest);
        }
    }


    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{fecha}")
    public void delete(@PathVariable(name = "fecha") String fecha) {
            partidoService.delete(fecha);
    }


}
