package com.spring.godoc.modules.cadastro.paciente;

import java.util.List;

import com.spring.godoc.core.exceptions.paciente.PacienteNotFoundException;
import com.spring.godoc.modules.cadastro.paciente.dtos.requests.PacienteRequest;
import com.spring.godoc.modules.cadastro.paciente.dtos.responses.PacienteResponse;
import com.spring.godoc.modules.cadastro.user.UserEntity;
import com.spring.godoc.modules.cadastro.user.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PacienteService {

    private final PacienteRepository pacienteRepository;
//    private final UserRepository userRepository;

    public PacienteService(PacienteRepository pacienteRepository, UserRepository userRepository) {
        this.pacienteRepository = pacienteRepository;
//        this.userRepository = userRepository;
    }

    public PacienteResponse createOrFindPaciente(PacienteRequest dto) {
        return pacienteRepository.findByCpf(dto.cpf())
                .map(this::toResponse)
                .orElseGet(() -> criaPaciente(dto));
    }

    public PacienteResponse criaPaciente(PacienteRequest dto) {
//        UserEntity user = userRepository.findById(dto.user().getId())
//                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        PacienteEntity paciente = new PacienteEntity();
        paciente.setCpf(dto.cpf());
        paciente.setDataNascimento(dto.dataNascimento());
        paciente.setIdade(dto.idade());
        paciente.setNome(dto.nome());
        paciente.setTelefone(dto.telefone());
//        paciente.setUser(user);

        PacienteEntity novoPaciente = pacienteRepository.save(paciente);
        return toResponse(novoPaciente);
    }

    public List<PacienteResponse> getPacientes() {
        return pacienteRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public PacienteResponse getPacienteById(Long id) {
        return toResponse(validarExistencia(id));
    }

    public PacienteEntity validarExistencia(Long id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new PacienteNotFoundException(id));
    }

    public PacienteResponse atualizaPaciente(Long id, PacienteRequest dto) {
        PacienteEntity paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new PacienteNotFoundException(id));

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
            throw new PacienteNotFoundException(id);
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
            paciente.getTelefone()
//            paciente.getUser()
        );
    }
}
