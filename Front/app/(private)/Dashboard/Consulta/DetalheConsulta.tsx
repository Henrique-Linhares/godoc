'use client'

import styles from './DetalheConsulta.module.css'

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
  concluido: 'Concluído',
}

interface DetalheConsultaProps {
  consulta: any
  onVoltar: () => void
}

export default function DetalheConsulta({ consulta, onVoltar }: DetalheConsultaProps) {
  const c = consulta

  const formatarHora = (iso: string) =>
    new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const formatarData = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  const formatarDataNasc = (iso: string) =>
    new Date(iso + 'T12:00').toLocaleDateString('pt-BR')

  const iniciais = (nome: string) =>
    nome.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase()

  const modalidadeClass =
    c.modalidade?.toLowerCase() === 'teleconsulta'
      ? styles.modalidade_teleconsulta
      : styles.modalidade_presencial

  const modalidadeIcon = c.modalidade?.toLowerCase() === 'teleconsulta' ? '📹' : '🏥'

  return (
    <div className={styles.overlay} onClick={onVoltar}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarIcon}>{iniciais(c.nomePaciente)}</div>
            <div className={styles.headerText}>
              <h1 className={styles.nome}>{c.nomePaciente}</h1>
              <p className={styles.subtipo}>
                {c.primeiraConsulta ? '1ª Consulta' : c.tipo === 'retorno' ? 'Retorno' : 'Acompanhamento'}
              </p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.closeBtn} onClick={onVoltar} title="Fechar">✕</button>
            <span className={`${styles.modalidadeBadge} ${modalidadeClass}`}>
              {modalidadeIcon} {c.modalidade}
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
                {c.nomePaciente && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>Nome completo</p>
                    <p className={styles.fieldValue}>{c.nomePaciente}</p>
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
                  <p className={styles.fieldValue}>{c.convenio ?? 'Particular'}</p>
                </div>
                {c.numeroCarteirinha && (
                  <div className={styles.field}>
                    <p className={styles.fieldLabel}>Nº da carteirinha</p>
                    <p className={styles.fieldValue}>{c.numeroCarteirinha}</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Coluna direita */}
          <div className={styles.rightCol}>

            <div className={styles.horarioCard}>
              <p className={styles.horarioLabel}>Horário da Consulta</p>
              <p className={styles.horarioHora}>{formatarHora(c.inicio)}</p>
              <p className={styles.horarioData}>{formatarData(c.inicio)}</p>
            </div>

            <div className={`${styles.statusBadge} ${styles['status_' + c.status]}`}>
              <span className={styles.statusDot} />
              {STATUS_LABEL[c.status] ?? c.status}
            </div>

            {(c.convenio || c.tipo) && (
              <div className={styles.infoCard}>
                <p className={styles.infoCardTitle}>Resumo</p>
                {c.tipo && (
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Tipo</p>
                    <p className={styles.infoValue}>
                      {c.tipo === 'consulta' ? 'Consulta' : c.tipo === 'retorno' ? 'Retorno' : 'Reunião'}
                    </p>
                  </div>
                )}
                {c.convenio && (
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Convênio</p>
                    <p className={styles.infoValue}>{c.convenio}</p>
                  </div>
                )}
                {c.primeiraConsulta != null && (
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>1ª vez</p>
                    <p className={styles.infoValue}>{c.primeiraConsulta ? 'Sim' : 'Não'}</p>
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
}
