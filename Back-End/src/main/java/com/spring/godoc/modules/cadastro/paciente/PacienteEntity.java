package com.spring.godoc.modules.cadastro.paciente;

import java.util.Date;

import com.spring.godoc.modules.cadastro.user.UserEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "pacientes")
public class PacienteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer idade;
    private String cpf;
    private Date dataNascimento;
    private String telefone;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    PacienteEntity() {}

    PacienteEntity(Long id, String nome, Integer idade, String cpf, Date dataNascimento, String telefone, UserEntity user) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.user = user;
    }

    Long getId() {
        return id;
    }

    void setId(Long id) {
        this.id = id;
    }

    String getNome() {
        return nome;
    }

    void setNome(String nome) {
        this.nome = nome;
    }

    Integer getIdade() {
        return idade;
    }

    void setIdade(Integer idade) {
        this.idade = idade;
    }

    String getCpf() {
        return cpf;
    }

    void setCpf(String cpf) {
        this.cpf = cpf;
    }

    Date getDataNascimento() {
        return dataNascimento;
    }

    void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    String getTelefone() {
        return telefone;
    }

    void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    UserEntity getUser() {
        return user;
    }

    void setUser(UserEntity user) {
        this.user = user;
    }
}
