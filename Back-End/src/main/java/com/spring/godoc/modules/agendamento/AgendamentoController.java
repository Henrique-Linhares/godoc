package com.spring.godoc.modules.agendamento;

import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoRequestDTO;
import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoUpdateRequestDTO;
import com.spring.godoc.modules.agendamento.dtos.responses.AgendamentoResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponseDTO> criar(@RequestBody AgendamentoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoResponseDTO>> getAllAgendamentos() {
        return ResponseEntity.ok(agendamentoService.getAllAgendamentos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.getById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> atualizar(@PathVariable Long id, @RequestBody AgendamentoUpdateRequestDTO dto) {
        return ResponseEntity.ok(agendamentoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        agendamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}