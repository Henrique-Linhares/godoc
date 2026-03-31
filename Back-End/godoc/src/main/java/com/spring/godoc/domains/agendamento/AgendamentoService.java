package com.spring.godoc.domains.agendamento;

import com.spring.godoc.domains.agendamento.dtos.responses.AgendamentoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    // Buscar por ID
    public AgendamentoResponse buscarPorId(Long id) {
        AgendamentoEntity agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com ID: " + id));

        return new AgendamentoResponse(
                agendamento.getId(),
                agendamento.getData(),
                agendamento.getStatus(),
                agendamento.getPaciente(),
                agendamento.getMedico()
        );
    }
}
