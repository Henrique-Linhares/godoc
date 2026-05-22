'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

export default function FormAgendamento() {

  const [nome, setNome] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [idade, setIdade] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  const [primeiraConsulta, setPrimeiraConsulta] = useState(true)
  const [convenio, setConvenio] = useState('')
  const [carteirinha, setCarteirinha] = useState('')
  const [motivo, setMotivo] = useState('')

  const [modalidade, setModalidade] = useState('presencial')

  return (
    <div className={styles.page}>

      {/* Card do médico */}
      <div className={styles.doctorCard}>
        <div className={styles.doctorInfo}>
          <div className={styles.doctorAvatar}>
            <Image src="/cleiton.png" alt="Dr. Cleiton Rasta" width={60} height={60} />
          </div>
          <div className={styles.doctorDetails}>
            <h2 className={styles.doctorName}>Dr. Cleiton Rasta</h2>
            <span className={styles.doctorSpecialty}>Ortopedista • São Carlos - SP</span>
            <div className={styles.doctorRating}>
              <span>★★★★★</span>
              <span className={styles.reviewCount}>23 Avaliações</span>
            </div>
          </div>
        </div>
        <div className={styles.priceTag}>
          <span>R$100 / Consulta</span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className={styles.content}>

        {/* Coluna esquerda - Formulário */}
        <div className={styles.formColumn}>

          {/* Dados Pessoais */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Dados Pessoais</h2>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Nome Completo*</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Como consta no documento"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Data de nascimento*</label>
                <input
                  type="date"
                  className={styles.input}
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Idade*</label>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Ex: 23"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>CPF*</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Telefone*</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="(18) 99999-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>E-mail</label>
              <input
                type="email"
                className={styles.input}
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </section>

          {/* Informações de Saúde */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Informações de Saúde</h2>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>É a primeira consulta com este médico?</label>
              <div className={styles.toggleGroup}>
                <button
                  className={`${styles.toggleBtn} ${primeiraConsulta ? styles.toggleActive : ''}`}
                  onClick={() => setPrimeiraConsulta(true)}
                >
                  Sim, primeira vez
                </button>
                <button
                  className={`${styles.toggleBtn} ${!primeiraConsulta ? styles.toggleActive : ''}`}
                  onClick={() => setPrimeiraConsulta(false)}
                >
                  Retorno / Acompanhamento
                </button>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Convênio / Plano de Saúde</label>
                <select
                  className={styles.select}
                  value={convenio}
                  onChange={(e) => setConvenio(e.target.value)}
                >
                  <option value="">Selecione seu plano ou particular</option>
                  <option value="particular">Particular</option>
                  <option value="unimed">Unimed</option>
                  <option value="sulamerica">SulAmérica</option>
                  <option value="bradesco">Bradesco Saúde</option>
                  <option value="amil">Amil</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Número da carteirinha</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Se possuir"
                  value={carteirinha}
                  onChange={(e) => setCarteirinha(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Motivo da consulta</label>
              <textarea
                className={styles.textarea}
                placeholder="Descreva brevemente o motivo da consulta..."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={3}
              />
            </div>
          </section>

          {/* Modalidade da consulta */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Modalidade da consulta</h2>
            <div className={styles.toggleGroup}>
              <button
                className={`${styles.toggleBtn} ${modalidade === 'presencial' ? styles.toggleActive : ''}`}
                onClick={() => setModalidade('presencial')}
              >
                Presencial
              </button>
              <button
                className={`${styles.toggleBtn} ${modalidade === 'teleconsulta' ? styles.toggleActive : ''}`}
                onClick={() => setModalidade('teleconsulta')}
              >
                Teleconsulta
              </button>
            </div>
          </section>

          {/* Botões */}
          <div className={styles.actions}>
            <button className={styles.confirmBtn}>Confirmar Agendamento</button>
            <button className={styles.cancelBtn}>Cancelar</button>
          </div>
        </div>

        {/* Coluna direita - Calendário e Horários (placeholder) */}
        <div className={styles.scheduleColumn}>

          <div className={styles.calendarPlaceholder}>
            <h3 className={styles.scheduleTitle}>Horarios disponiveis</h3>
            {/* Espaço reservado para o calendário */}
            <div className={styles.placeholderBox}>
              <span className={styles.placeholderText}>Calendário será implementado aqui</span>
            </div>
          </div>

          <div className={styles.timeSlotsPlaceholder}>
            <h3 className={styles.scheduleTitle}>Horários</h3>
            {/* Espaço reservado para os horários */}
            <div className={styles.placeholderBox}>
              <span className={styles.placeholderText}>Horários serão exibidos aqui</span>
            </div>
          </div>

          <div className={styles.selectedSlot}>
            <h4 className={styles.selectedTitle}>Horário Selecionado</h4>
            <span className={styles.selectedInfo}>Nenhum horário selecionado</span>
          </div>

        </div>
      </div>
    </div>
  )
}
