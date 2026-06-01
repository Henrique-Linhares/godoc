package com.spring.godoc.modules.agendamento;

import com.spring.godoc.modules.agendamento.enums.ModalidadeAgendamento;
import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.agendamento.enums.TipoConsulta;
import com.spring.godoc.modules.cadastro.medico.MedicoEntity;
import com.spring.godoc.modules.cadastro.paciente.PacienteEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos")
public class AgendamentoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime data;
    private LocalDateTime fim;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;

    @Enumerated(EnumType.STRING)
    private TipoConsulta tipoConsulta;

    private String convenio;
    private String numeroCarteirinhaPlano;
    private String motivoConsulta;

    @Enumerated(EnumType.STRING)
    private ModalidadeAgendamento modalidade;

//    @OneToOne
//    @JoinColumn(name = "paciente_id")
//    private PacienteEntity paciente;

    @ManyToOne
    @JoinColumn(name = "medico_id")
    private MedicoEntity medico;

    public AgendamentoEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public LocalDateTime getFim() {
        return fim;
    }

    public void setFim(LocalDateTime fim) {
        this.fim = fim;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }

    public TipoConsulta getTipoConsulta() {
        return tipoConsulta;
    }

    public void setTipoConsulta(TipoConsulta tipoConsulta) {
        this.tipoConsulta = tipoConsulta;
    }

    public String getConvenio() {
        return convenio;
    }

    public void setConvenio(String convenio) {
        this.convenio = convenio;
    }

    public String getNumeroCarteirinhaPlano() {
        return numeroCarteirinhaPlano;
    }

    public void setNumeroCarteirinhaPlano(String numeroCarteirinhaPlano) {
        this.numeroCarteirinhaPlano = numeroCarteirinhaPlano;
    }

    public String getMotivoConsulta() {
        return motivoConsulta;
    }

    public void setMotivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
    }

    public ModalidadeAgendamento getModalidade() {
        return modalidade;
    }

    public void setModalidade(ModalidadeAgendamento modalidade) {
        this.modalidade = modalidade;
    }

//    public PacienteEntity getPaciente() {
//        return paciente;
//    }
//
//    public void setPaciente(PacienteEntity paciente) {
//        this.paciente = paciente;
//    }

    public MedicoEntity getMedico() {
        return medico;
    }

    public void setMedico(MedicoEntity medico) {
        this.medico = medico;
    }
}