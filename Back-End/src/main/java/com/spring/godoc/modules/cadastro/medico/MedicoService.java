package com.spring.godoc.modules.cadastro.medico;

import java.util.List;

import com.spring.godoc.modules.cadastro.medico.dtos.requests.MedicoRequest;
import com.spring.godoc.modules.cadastro.medico.dtos.responses.MedicoResponse;
import com.spring.godoc.modules.cadastro.user.UserEntity;
import com.spring.godoc.modules.cadastro.user.UserRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class MedicoService {

    private final MedicoRepository medicoRepository;
    private final UserRepository userRepository;

    public MedicoService(MedicoRepository medicoRepository, UserRepository userRepository) {
        this.medicoRepository = medicoRepository;
        this.userRepository = userRepository;
    }

    private MedicoResponse toResponse(MedicoEntity medico) {
        return new MedicoResponse(
                medico.getId(),
                medico.getCrm(),
                medico.getNome(),
                medico.getEspecialidade(),
                medico.getTelefone(),
                medico.getUser().getEmail(),
                medico.getUser().getRole().toString()
        );
    }

    public MedicoResponse criaMedico(MedicoRequest request) {
        UserEntity user = userRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado!"));

        MedicoEntity medico = new MedicoEntity();
        medico.setCrm(request.crm());
        medico.setNome(request.nome());
        medico.setEspecialidade(request.especialidade());
        medico.setTelefone(request.telefone());
        medico.setUser(user);

        return toResponse(medicoRepository.save(medico));
    }

    public List<MedicoResponse> getMedicos() {
        return medicoRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public MedicoResponse getMedicoById(Long id) {
        MedicoEntity medico = medicoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Médico não encontrado"));
        return toResponse(medico);
    }

    public MedicoResponse atualizaMedico(Long id, MedicoRequest request) {
        MedicoEntity medico = medicoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Médico não encontrado"));

        if (request.crm() != null) medico.setCrm(request.crm());
        if (request.nome() != null) medico.setNome(request.nome());
        if (request.especialidade() != null) medico.setEspecialidade(request.especialidade());
        if (request.telefone() != null) medico.setTelefone(request.telefone());

        return toResponse(medico);
    }

    public void deletaMedico(Long id) {
        if (!medicoRepository.existsById(id)) {
            throw new EntityNotFoundException("Médico não encontrado!");
        }
        medicoRepository.deleteById(id);
    }
}