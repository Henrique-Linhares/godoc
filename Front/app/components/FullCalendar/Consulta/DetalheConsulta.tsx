'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import styles from './DetalheConsulta.module.css'

// Labels de status (V2 - uppercase)
const STATUS_LABEL: Record<string, string> = {
  AGENDADO: 'Agendado',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
}

// Labels de convênio para exibição amigável
const CONVENIO_LABEL: Record<string, string> = {
  PARTICULAR: 'Particular',
  UNIMED: 'Unimed',
  SULAMERICA: 'SulAmérica',
  BRADESCO_SAUDE: 'Bradesco Saúde',
  AMIL: 'Amil',
  OUTROS: 'Outros',
}

interface DetalheConsultaProps {
  consulta: any
  onVoltar: () => void
}

export default function DetalheConsulta({ consulta, onVoltar }: DetalheConsultaProps) {
  const c = consulta
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when overlay is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const formatarHora = (iso: string) =>
    new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const formatarData = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  const formatarDataNasc = (iso: string) =>
    new Date(iso + 'T12:00').toLocaleDateString('pt-BR')

  const iniciais = (nome: string) =>
    nome.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase()

  // Modalidade V2 (PRESENCIAL / TELECONSULTA)
  const modalidadeClass =
    c.modalidade === 'TELECONSULTA'
      ? styles.modalidade_teleconsulta
      : styles.modalidade_presencial

  const modalidadeIcon = c.modalidade === 'TELECONSULTA' ? '📹' : '🏥'

  // Converte modalidade para exibição amigável
  const modalidadeLabel = c.modalidade === 'TELECONSULTA' ? 'Teleconsulta' : 'Presencial'

  // tipoConsulta V2 (PRIMEIRA / RETORNO)
  const tipoLabel = c.tipoConsulta === 'PRIMEIRA' ? '1ª Consulta' : 'Retorno'

  // Convênio label amigável
  const convenioLabel = CONVENIO_LABEL[c.convenio] || c.convenio || 'Particular'

  if (!mounted) return null

  const overlayContent = (
    <div className={styles.overlay} onClick={onVoltar}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarIcon}>{iniciais(c.nomeCompleto)}</div>
            <div className={styles.headerText}>
              <h1 className={styles.nome}>{c.nomeCompleto}</h1>
              <p className={styles.subtipo}>{tipoLabel}</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.closeBtn} onClick={onVoltar} title="Fechar">✕</button>
            <span className={`${styles.modalidadeBadge} ${modalidadeClass}`}>
              {modalidadeIcon} {modalidadeLabel}
            </span>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className={styles.body}>

          {/* Coluna esquerda */}
          <div className={styles.leftCol}>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Dados do Paciente</h2>
              <div className={styles.fieldGrid}>
                {c.nomeCompleto && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>Nome completo</p>
                    <p className={styles.fieldValue}>{c.nomeCompleto}</p>
                  </div>
                )}
                {c.idade != null && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>Idade</p>
                    <p className={styles.fieldValue}>{c.idade} anos</p>
                  </div>
                )}
                {c.dataNascimento && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>Data de nascimento</p>
                    <p className={styles.fieldValue}>{formatarDataNasc(c.dataNascimento)}</p>
                  </div>
                )}
                {c.cpf && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>CPF</p>
                    <p className={styles.fieldValue}>{c.cpf}</p>
                  </div>
                )}
                {c.telefone && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>Telefone</p>
                    <p className={styles.fieldValue}>{c.telefone}</p>
                  </div>
                )}
                {c.email && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>E-mail</p>
                    <p className={styles.fieldValue}>{c.email}</p>
                  </div>
                )}
              </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Motivo da Consulta</h2>
              <div className={styles.motivoBox}>
                <p className={styles.motivoText}>{c.motivoConsulta ?? '—'}</p>
              </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Plano de Saúde</h2>
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <p className={styles.fieldLabel}>Convênio</p>
                  <p className={styles.fieldValue}>{convenioLabel}</p>
                </div>
                {c.numeroCarteirinhaPlano && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>Nº da carteirinha</p>
                    <p className={styles.fieldValue}>{c.numeroCarteirinhaPlano}</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Coluna direita */}
          <div className={styles.rightCol}>

            <div className={styles.horarioCard}>
              <p className={styles.horarioLabel}>Horário da Consulta</p>
              <p className={styles.horarioHora}>{formatarHora(c.dataHoraAgendamento)}</p>
              <p className={styles.horarioData}>{formatarData(c.dataHoraAgendamento)}</p>
            </div>

            <div className={`${styles.statusBadge} ${styles['status_' + c.status]}`}>
              <span className={styles.statusDot} />
              {STATUS_LABEL[c.status] ?? c.status}
            </div>

            {(c.convenio || c.tipoConsulta) && (
              <div className={styles.infoCard}>
                <p className={styles.infoCardTitle}>Resumo</p>
                {c.tipoConsulta && (
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Tipo</p>
                    <p className={styles.infoValue}>{tipoLabel}</p>
                  </div>
                )}
                {c.convenio && (
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Convênio</p>
                    <p className={styles.infoValue}>{convenioLabel}</p>
                  </div>
                )}
                {c.tipoConsulta && (
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>1ª vez</p>
                    <p className={styles.infoValue}>{c.tipoConsulta === 'PRIMEIRA' ? 'Sim' : 'Não'}</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div className={styles.footer}>
          <button className={styles.voltarBtn} onClick={onVoltar}>
            ← Voltar ao Dashboard
          </button>
        </div>

      </div>
    </div>
  )

  return createPortal(overlayContent, document.body)
}

