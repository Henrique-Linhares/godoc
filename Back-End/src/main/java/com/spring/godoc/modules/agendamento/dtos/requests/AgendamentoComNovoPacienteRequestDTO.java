package com.spring.godoc.modules.agendamento.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.godoc.modules.agendamento.enums.ModalidadeAgendamento;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.agendamento.enums.TipoConsulta;

import java.time.LocalDateTime;
import java.util.Date;

public record AgendamentoComNovoPacienteRequestDTO(
        String nomePaciente,
        Integer idadePaciente,
        String cpfPaciente,
        Date dataNascimentoPaciente,
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
