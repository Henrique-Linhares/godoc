package com.spring.godoc.modules.cadastro.paciente;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pacientes")
public class PacienteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer idade;
    private String cpf;
    private LocalDate dataNascimento;
    private String telefone;

//    @OneToOne
//    @JoinColumn(name = "user_id")
//    private UserEntity user;

    PacienteEntity() {}

    PacienteEntity(Long id, String nome, Integer idade, String cpf, LocalDate dataNascimento, String telefone) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
//        this.user = user;
    }

    public Long getId() {
        return id;
    }

    void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getIdade() {
        return idade;
    }

    void setIdade(Integer idade) {
        this.idade = idade;
    }

    public String getCpf() {
        return cpf;
    }

    void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getTelefone() {
        return telefone;
    }

    void setTelefone(String telefone) {
        this.telefone = telefone;
    }

//    UserEntity getUser() {
//        return user;
//    }
//
//    void setUser(UserEntity user) {
//        this.user = user;
//    }
}
