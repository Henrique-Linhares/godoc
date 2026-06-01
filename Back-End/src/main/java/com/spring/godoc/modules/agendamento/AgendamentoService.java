package com.spring.godoc.modules.agendamento;

import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoRequestDTO;
import com.spring.godoc.modules.agendamento.dtos.responses.AgendamentoResponseDTO;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.cadastro.medico.MedicoEntity;
import com.spring.godoc.modules.cadastro.medico.MedicoRepository;
import com.spring.godoc.modules.cadastro.paciente.PacienteEntity;
import com.spring.godoc.modules.cadastro.paciente.PacienteRepository;
import org.springframework.stereotype.Service;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final MedicoRepository medicoRepository;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            MedicoRepository medicoRepository
    ) {
        this.agendamentoRepository = agendamentoRepository;
        this.medicoRepository = medicoRepository;
    }

    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto) {
        MedicoEntity medico = medicoRepository.findById(dto.idMedico())
                .orElseThrow(() -> new RuntimeException("Médico não encontrado: " + dto.idMedico()));

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

        AgendamentoEntity salvo = agendamentoRepository.save(agendamento);

        return toResponseDTO(salvo, dto);
    }

    private AgendamentoResponseDTO toResponseDTO(AgendamentoEntity entity, AgendamentoRequestDTO dto) {
        return new AgendamentoResponseDTO(
                entity.getId(),
                dto.nomeCompleto(),   // dados do paciente vêm do DTO
                dto.cpf(),
                dto.telefone(),
                entity.getTipoConsulta(),
                entity.getConvenio(),
                entity.getNumeroCarteirinhaPlano(),
                entity.getMotivoConsulta(),
                entity.getModalidade(),
                entity.getData(),
                entity.getFim(),
                entity.getMedico().getId(),
                entity.getStatus()
        );
    }
}