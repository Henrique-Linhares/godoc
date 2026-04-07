package com.spring.godoc.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;


/*Classe principal do spring security, a central de segurança*/
@Configuration
@EnableWebSecurity //ativa toda a estrutura de sergurança web do spring secutiry
@EnableMethodSecurity
public class SecurityConfig {
    
    private final UserDetailsService userDetailsService;
    private final JwtDecoder jwtDecoder;

    public SecurityConfig(UserDetailsService userDetailsService, JwtDecoder jwtDecoder) {
        this.userDetailsService = userDetailsService;
        this.jwtDecoder = jwtDecoder;
    }


    /*Configurando os acessos ao endpoints, JWT e setando o server como STATELESS*/
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws  Exception {
        httpSecurity
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(Arrays.asList("*"));
                config.setAllowCredentials(true);
                return config;
            }))
            .csrf(csrf -> csrf.disable()) //CSRF (Cross-Site Request Forgery), importante para aplicações com sessões (stateful)
            /*Configurando o acesso dos endpoints*/
            .authorizeHttpRequests(auth -> auth

                /*Endpoints Publicos*/
                .requestMatchers("/authn/**").permitAll() //endpoint publicos. O ** é um pattern que significa "qualquer coisa depois de /authn/"

                /*Endpoints do Swagger*/
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()

                /*Endpoints administrativos*/
                .requestMatchers("/admin/**").hasRole("ADMIN") //endpoint que precisa da role admin

                /*Geral*/
                .anyRequest().authenticated()//todos os outros precisam de autentication)
            )
            
            /*Ativando o uso de toda a estrutura JWT*/
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder)
                )
            )
            /*Configurando o padrão STATELESS*/
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );


        return httpSecurity.build();
    }


    /*Responsável pela validação das tentativas de autenticação(login). O AuthenticationConfiguration gerencia automaticamente a conexão do UserDetailsService com o PasswordEncoder*/
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)  throws Exception {
        return configuration.getAuthenticationManager();
    };

    /*Definindo o PassWordEncoder usado para criar as hash das senhas*/
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
