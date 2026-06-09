package com.spring.godoc.modules.cadastro.medico;

import com.spring.godoc.modules.cadastro.medico.dtos.requests.MedicoRequest;
import com.spring.godoc.modules.cadastro.medico.dtos.requests.MedicoUpdateRequest;
import com.spring.godoc.modules.cadastro.medico.dtos.responses.MedicoResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @PostMapping
    public ResponseEntity<MedicoResponse> createDoctor(@Valid @RequestBody MedicoRequest request) {
        MedicoResponse medicoResponse = medicoService.criaMedico(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(medicoResponse);
    }

    @GetMapping
    public ResponseEntity<List<MedicoResponse>> getAllDoctors() {
        return ResponseEntity.ok(medicoService.getMedicos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.getMedicoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicoResponse> updateDoctor(@PathVariable Long id, @RequestBody MedicoUpdateRequest request) {
        return ResponseEntity.ok(medicoService.atualizaMedico(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        medicoService.deletaMedico(id);
        return ResponseEntity.noContent().build();
    }
}