package com.spring.godoc.domains.paciente;

import java.util.List;
import org.springframework.stereotype.Service;

import com.spring.godoc.domains.paciente.dtos.requests.PacienteRequest;
import com.spring.godoc.domains.paciente.dtos.responses.PacienteResponse;
import com.spring.godoc.domains.user.UserEntity;
import com.spring.godoc.domains.user.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class PacienteService {

    private PacienteRepository pacienteRepository;
    private UserRepository userRepository;

    public PacienteService(PacienteRepository pacienteRepository, UserRepository userRepository) {
        this.pacienteRepository = pacienteRepository;
        this.userRepository = userRepository;
    }

    public PacienteResponse criaPaciente(PacienteRequest dto) {
        UserEntity user = userRepository.findById(dto.user().getId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        PacienteEntity paciente = new PacienteEntity();
        paciente.setCpf(dto.cpf());
        paciente.setDataNascimento(dto.dataNascimento());
        paciente.setIdade(dto.idade());
        paciente.setNome(dto.nome());
        paciente.setTelefone(dto.telefone());

        PacienteEntity novoPaciente = pacienteRepository.save(paciente);

        return toResponse(novoPaciente);
    }

    public List<PacienteResponse> getPacientes() {
        return pacienteRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public PacienteResponse getPacienteById(Long id) {
        PacienteEntity paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));
        return toResponse(paciente);
    }

    public PacienteResponse atualizaPaciente(Long id, PacienteRequest dto) {
        PacienteEntity paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));

        if (dto.cpf() != null) paciente.setCpf(dto.cpf());
        if (dto.dataNascimento() != null) paciente.setDataNascimento(dto.dataNascimento());
        if (dto.idade() != null) paciente.setIdade(dto.idade());
        if (dto.nome() != null) paciente.setNome(dto.nome());
        if (dto.telefone() != null) paciente.setTelefone(dto.telefone());

        PacienteEntity pacienteAtualizado = pacienteRepository.save(paciente);
        return toResponse(pacienteAtualizado);
    }

    public void deletePaciente(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new EntityNotFoundException("Paciente não encontrado");
        }
        pacienteRepository.deleteById(id);
    }

    private PacienteResponse toResponse(PacienteEntity paciente) {
        return new PacienteResponse(
            paciente.getId(),
            paciente.getNome(),
            paciente.getIdade(),
            paciente.getCpf(),
            paciente.getDataNascimento(),
            paciente.getTelefone(),
            paciente.getUser()
        );
    }
}
