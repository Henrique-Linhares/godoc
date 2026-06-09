package com.spring.godoc.modules.agendamento;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.godoc.core.exceptions.agendamento.AgendamentoConflictException;
import com.spring.godoc.core.exceptions.agendamento.AgendamentoNotFoundException;
import com.spring.godoc.core.wapApi.MessageWapApiService;
import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoComNovoPacienteRequestDTO;
import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoRequestDTO;
import com.spring.godoc.modules.agendamento.dtos.requests.AgendamentoUpdateRequestDTO;
import com.spring.godoc.modules.agendamento.dtos.responses.AgendamentoResponseDTO;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.cadastro.medico.MedicoEntity;
import com.spring.godoc.modules.cadastro.medico.MedicoService;
import com.spring.godoc.modules.cadastro.paciente.PacienteEntity;
import com.spring.godoc.modules.cadastro.paciente.PacienteService;
import com.spring.godoc.modules.cadastro.paciente.dtos.requests.PacienteRequest;
import com.spring.godoc.modules.cadastro.paciente.dtos.responses.PacienteResponse;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final MedicoService medicoService;
    private final PacienteService pacienteService;
    private final MessageWapApiService notificacaoService;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            MedicoService medicoService,
            PacienteService pacienteService,
            MessageWapApiService notificacaoService
    ) {
        this.agendamentoRepository = agendamentoRepository;
        this.medicoService = medicoService;
        this.pacienteService = pacienteService;
        this.notificacaoService = notificacaoService;
    }

    @Transactional
    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto) {
        MedicoEntity medico = medicoService.validarExistencia(dto.idMedico());
        PacienteEntity paciente = pacienteService.validarExistencia(dto.idPaciente());

        LocalDateTime inicio = dto.dataHoraAgendamento();
        LocalDateTime fim = inicio.plusHours(1);

        if (agendamentoRepository.existsByMedicoIdAndIdNotAndInicioBeforeAndFimAfter(medico.getId(), -1L, fim, inicio)) {
            throw new AgendamentoConflictException();
        }

        AgendamentoEntity agendamento = new AgendamentoEntity();
        agendamento.setInicio(inicio);
        agendamento.setFim(fim);
        agendamento.setStatus(dto.status() != null ? dto.status() : StatusAgendamento.AGENDADO);
        agendamento.setTipoConsulta(dto.tipoConsulta());
        agendamento.setConvenio(dto.convenio());
        agendamento.setNumeroCarteirinhaPlano(dto.numeroCarteirinhaPlano());
        agendamento.setMotivoConsulta(dto.motivoConsulta());
        agendamento.setModalidade(dto.modalidade());
        agendamento.setMedico(medico);
        agendamento.setPaciente(paciente);

        AgendamentoResponseDTO response = toResponseDTO(agendamentoRepository.save(agendamento));
        notificacaoService.sendMessageConfirmation(response);
        return response;
    }

    @Transactional
    public AgendamentoResponseDTO criarComNovoPaciente(AgendamentoComNovoPacienteRequestDTO dto) {
        MedicoEntity medico = medicoService.validarExistencia(dto.idMedico());

        PacienteResponse pacienteResponse = pacienteService.createOrFindPaciente(
                new PacienteRequest(dto.nomePaciente(), dto.idadePaciente(), dto.cpfPaciente(),
                        dto.dataNascimentoPaciente(), dto.telefonePaciente()));

        PacienteEntity paciente = pacienteService.validarExistencia(pacienteResponse.id());

        LocalDateTime inicio = dto.dataHoraAgendamento();
        LocalDateTime fim = inicio.plusHours(1);

        if (agendamentoRepository.existsByMedicoIdAndIdNotAndInicioBeforeAndFimAfter(medico.getId(), -1L, fim, inicio)) {
            throw new AgendamentoConflictException();
        }

        AgendamentoEntity agendamento = new AgendamentoEntity();
        agendamento.setInicio(inicio);
        agendamento.setFim(fim);
        agendamento.setStatus(dto.status() != null ? dto.status() : StatusAgendamento.AGENDADO);
        agendamento.setTipoConsulta(dto.tipoConsulta());
        agendamento.setConvenio(dto.convenio());
        agendamento.setNumeroCarteirinhaPlano(dto.numeroCarteirinhaPlano());
        agendamento.setMotivoConsulta(dto.motivoConsulta());
        agendamento.setModalidade(dto.modalidade());
        agendamento.setMedico(medico);
        agendamento.setPaciente(paciente);

        AgendamentoResponseDTO response = toResponseDTO(agendamentoRepository.save(agendamento));
        notificacaoService.sendMessageConfirmation(response);
        return response;
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponseDTO> getAllAgendamentos() {
        return agendamentoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public AgendamentoResponseDTO getById(Long id) {
        AgendamentoEntity agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new AgendamentoNotFoundException(id));
        return toResponseDTO(agendamento);
    }

    @Transactional
    public AgendamentoResponseDTO atualizar(Long id, AgendamentoUpdateRequestDTO dto) {
        AgendamentoEntity agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new AgendamentoNotFoundException(id));

        if (dto.idMedico() != null) {
            agendamento.setMedico(medicoService.validarExistencia(dto.idMedico()));
        }

        if (dto.idPaciente() != null) {
            agendamento.setPaciente(pacienteService.validarExistencia(dto.idPaciente()));
        }

        if (dto.dataHoraAgendamento() != null) {
            LocalDateTime novoInicio = dto.dataHoraAgendamento();
            LocalDateTime novoFim = novoInicio.plusHours(1);

            if (agendamentoRepository.existsByMedicoIdAndIdNotAndInicioBeforeAndFimAfter(
                    agendamento.getMedico().getId(), id, novoFim, novoInicio)) {
                throw new AgendamentoConflictException();
            }

            agendamento.setInicio(novoInicio);
            agendamento.setFim(novoFim);
        }

        if (dto.status() != null) agendamento.setStatus(dto.status());
        if (dto.tipoConsulta() != null) agendamento.setTipoConsulta(dto.tipoConsulta());
        if (dto.convenio() != null) agendamento.setConvenio(dto.convenio());
        if (dto.numeroCarteirinhaPlano() != null) agendamento.setNumeroCarteirinhaPlano(dto.numeroCarteirinhaPlano());
        if (dto.motivoConsulta() != null) agendamento.setMotivoConsulta(dto.motivoConsulta());
        if (dto.modalidade() != null) agendamento.setModalidade(dto.modalidade());

        return toResponseDTO(agendamentoRepository.save(agendamento));
    }

    @Transactional
    public void deletar(Long id) {
        AgendamentoEntity agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new AgendamentoNotFoundException(id));
        agendamentoRepository.delete(agendamento);
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
                entity.getInicio(),
                entity.getFim(),
                paciente.getId(),
                entity.getMedico().getId(),
                entity.getStatus()
        );
    }
}
