package com.spring.godoc.modules.agendamento.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.godoc.modules.agendamento.enums.ModalidadeAgendamento;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.agendamento.enums.TipoConsulta;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AgendamentoComNovoPacienteRequestDTO(
        String nomePaciente,
        Integer idadePaciente,
        String cpfPaciente,

        @JsonFormat(pattern = "dd-MM-yyyy")
        LocalDate dataNascimentoPaciente,
        String telefonePaciente,

        Long idMedico,
        TipoConsulta tipoConsulta,
        String convenio,
        String numeroCarteirinhaPlano,
        String motivoConsulta,
        ModalidadeAgendamento modalidade,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
        LocalDateTime dataHoraAgendamento,

        StatusAgendamento status
) {}
