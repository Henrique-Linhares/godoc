package com.spring.godoc.core.wapApi;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class WapApiClient {

    private final RestClient restClient;
    private final WapApiProperties properties;

    public WapApiClient(WapApiProperties properties) {
        this.properties = properties;
        this.restClient = RestClient.builder()
                .baseUrl(properties.getBaseUrl())
                .defaultHeader("apikey", properties.getApikey())
                .build();
    }

    public void enviarMensagem(String numero, String texto) {
        Map<String, String> body = Map.of(
                "number", numero,
                "text", texto
        );

        restClient.post()
                .uri("/message/sendText/{instance}", properties.getInstance())
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }
}
