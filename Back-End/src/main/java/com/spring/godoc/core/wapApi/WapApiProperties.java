package com.spring.godoc.core.wapApi;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "wap-api")
public class WapApiProperties {

    private String baseUrl;
    private String instance;
    private String apikey;

    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }

    public String getInstance() { return instance; }
    public void setInstance(String instance) { this.instance = instance; }

    public String getApikey() { return apikey; }
    public void setApikey(String apikey) { this.apikey = apikey; }
}
