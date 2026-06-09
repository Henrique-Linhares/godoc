package com.spring.godoc.core.wapApi;

import com.spring.godoc.modules.agendamento.dtos.responses.AgendamentoResponseDTO;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class MessageWapApiService {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy 'às' HH:mm");

    private final WapApiClient wapApiClient;

    public MessageWapApiService(WapApiClient wapApiClient) {
        this.wapApiClient = wapApiClient;
    }

    @Async
    public void sendMessageConfirmation(AgendamentoResponseDTO agendamento) {
        try {
            String mensagem = String.format(
                    "Olá, %s! Seu agendamento foi confirmado para %s. Até logo!",
                    agendamento.nomeCompleto(),
                    agendamento.dataHoraAgendamento().format(FORMATTER)
            );

            wapApiClient.enviarMensagem(agendamento.telefone(), mensagem);
        } catch (Exception e) {
            System.err.println("Falha ao enviar notificação para o agendamento " + agendamento.id() + ": " + e.getMessage());
        }
    }
}
