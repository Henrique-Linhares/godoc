package com.spring.godoc.modules.cadastro.medico;

import com.spring.godoc.modules.cadastro.user.UserEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "medicos")
public class MedicoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String crm;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String especialidade;

    @Column(nullable = false)
    private String telefone;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    MedicoEntity() {}

    MedicoEntity(Long id, String crm, String nome, String especialidade, String telefone, UserEntity user) {
        this.id = id;
        this.crm = crm;
        this.nome = nome;
        this.especialidade = especialidade;
        this.telefone = telefone;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    void setId(Long id) {
        this.id = id;
    }

    String getCrm() {
        return crm;
    }

    void setCrm(String crm) {
        this.crm = crm;
    }

    String getNome() {
        return nome;
    }

    void setNome(String nome) {
        this.nome = nome;
    }

    String getEspecialidade() {
        return especialidade;
    }

    void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
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
