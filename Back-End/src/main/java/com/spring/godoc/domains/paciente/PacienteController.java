package com.spring.godoc.domains.paciente;

import com.spring.godoc.domains.paciente.dtos.requests.PacienteRequest;
import com.spring.godoc.domains.paciente.dtos.responses.PacienteResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<PacienteResponse> criaPaciente(@RequestBody PacienteRequest request) {
        PacienteResponse pacienteResponse = pacienteService.criaPaciente(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteResponse);
    }

    @GetMapping
    public ResponseEntity<List<PacienteResponse>> getAll() {
        return ResponseEntity.ok(pacienteService.getPacientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pacienteService.getPacienteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteResponse> atualizaPaciente(@PathVariable Long id, @RequestBody PacienteRequest request) {
        return ResponseEntity.ok(pacienteService.atualizaPaciente(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        pacienteService.deletePaciente(id);
        return ResponseEntity.noContent().build();
    }
}
