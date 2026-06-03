package com.spring.godoc.modules.agendamento;

import com.spring.godoc.core.exceptions.medico.MedicoNotFoundException;
import com.spring.godoc.core.exceptions.paciente.PacienteNotFoundException;
import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoRequestDTO;
import com.spring.godoc.modules.agendamento.dtos.responses.AgendamentoResponseDTO;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.cadastro.medico.MedicoEntity;
import com.spring.godoc.modules.cadastro.medico.MedicoRepository;
import com.spring.godoc.modules.cadastro.paciente.PacienteEntity;
import com.spring.godoc.modules.cadastro.paciente.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            MedicoRepository medicoRepository,
            PacienteRepository pacienteRepository
    ) {
        this.agendamentoRepository = agendamentoRepository;
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto) {
        MedicoEntity medico = medicoRepository.findById(dto.idMedico())
                .orElseThrow(() -> new MedicoNotFoundException(dto.idMedico()));

        PacienteEntity paciente = pacienteRepository.findById(dto.idPaciente())
                .orElseThrow(() -> new PacienteNotFoundException(dto.idPaciente()));

        AgendamentoEntity agendamento = new AgendamentoEntity();
        agendamento.setData(dto.dataHoraAgendamento());
        agendamento.setFim(dto.dataHoraAgendamento().plusHours(1));
        agendamento.setStatus(dto.status() != null ? dto.status() : StatusAgendamento.AGENDADO);
        agendamento.setTipoConsulta(dto.tipoConsulta());
        agendamento.setConvenio(dto.convenio());
        agendamento.setNumeroCarteirinhaPlano(dto.numeroCarteirinhaPlano());
        agendamento.setMotivoConsulta(dto.motivoConsulta());
        agendamento.setModalidade(dto.modalidade());
        agendamento.setMedico(medico);
        agendamento.setPaciente(paciente);

        AgendamentoEntity salvo = agendamentoRepository.save(agendamento);

        return toResponseDTO(salvo);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponseDTO> getAllAgendamentos() {
        return agendamentoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    private AgendamentoResponseDTO toResponseDTO(AgendamentoEntity entity) {
        PacienteEntity paciente = entity.getPaciente();
        return new AgendamentoResponseDTO(
                entity.getId(),
                paciente.getNome(),
                paciente.getCpf(),
                paciente.getTelefone(),
                entity.getTipoConsulta(),
                entity.getConvenio(),
                entity.getNumeroCarteirinhaPlano(),
                entity.getMotivoConsulta(),
                entity.getModalidade(),
                entity.getData(),
                entity.getFim(),
                paciente.getId(),
                entity.getMedico().getId(),
                entity.getStatus()
        );
    }
}
