package com.spring.godoc.modules.agendamento;

import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoComNovoPacienteRequestDTO;
import com.spring.godoc.core.wapApi.MessageWapApiService;
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
    private final MessageWapApiService notificacaoService;

    public AgendamentoController(AgendamentoService agendamentoService, MessageWapApiService notificacaoService) {
        this.agendamentoService = agendamentoService;
        this.notificacaoService = notificacaoService;
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponseDTO> criar(@RequestBody AgendamentoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoService.criar(dto));
    }

    @PostMapping("/comPaciente")
    public ResponseEntity<AgendamentoResponseDTO> criarComNovoPaciente(@RequestBody AgendamentoComNovoPacienteRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoService.criarComNovoPaciente(dto));
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

    @PostMapping("/{id}/notificar")
    public ResponseEntity<Void> reenviarNotificacao(@PathVariable Long id) {
        AgendamentoResponseDTO agendamento = agendamentoService.getById(id);
        notificacaoService.sendMessageConfirmation(agendamento);
        return ResponseEntity.accepted().build();
    }
}