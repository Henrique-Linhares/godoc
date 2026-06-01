// AgendamentoRequestDTO.java
package com.spring.godoc.modules.agendamento.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.godoc.modules.agendamento.enums.ModalidadeAgendamento;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.agendamento.enums.TipoConsulta;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AgendamentoRequestDTO(
        String nomeCompleto,

        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate dataNascimento,

        Integer idade,
        String cpf,
        String email,
        String telefone,
        TipoConsulta tipoConsulta,
        String convenio,
        String numeroCarteirinhaPlano,
        String motivoConsulta,
        ModalidadeAgendamento modalidade,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
        LocalDateTime dataHoraAgendamento,

//        Long idPaciente,
        Long idMedico,
        StatusAgendamento status
) {}