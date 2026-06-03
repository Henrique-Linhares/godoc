// AgendamentoResponseDTO.java
package com.spring.godoc.modules.agendamento.dtos.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.godoc.modules.agendamento.enums.ModalidadeAgendamento;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.agendamento.enums.TipoConsulta;

import java.time.LocalDateTime;

public record AgendamentoResponseDTO(
        Long id,
        String nomeCompleto,
        String cpf,
//        String email,
        String telefone,
        TipoConsulta tipoConsulta,
        String convenio,
        String numeroCarteirinhaPlano,
        String motivoConsulta,
        ModalidadeAgendamento modalidade,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dataHoraAgendamento,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dataHoraFim,

        Long idPaciente,
        Long idMedico,
        StatusAgendamento status
) {}