'use client'
import { useEffect, useState } from 'react'
import FullCalendarLib from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styles from './page.module.css'
import DetalheConsulta from './Consulta/DetalheConsulta'

import { ROUTES } from '@/routes/routes'
import { useRouter } from 'next/navigation'

const FullCalendar = FullCalendarLib as any

// Cores por tipoConsulta (V2)
const CORES: Record<string, string> = {
  PRIMEIRA: '#3b82f6',
  RETORNO: '#10b981',
}

export default function Dashboard() {
  const [consultas, setConsultas] = useState<any[]>([])
  const [selecionada, setSelecionada] = useState<any | null>(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/consultas')
      .then(r => r.json())
      .then(setConsultas)
  }, [])

  const router = useRouter()
  const hoje = new Date().toISOString().slice(0, 10)
  const agora = new Date()

  // Filtra consultas do dia usando dataHoraAgendamento (V2)
  const doDia = consultas.filter(c => c.dataHoraAgendamento?.startsWith(hoje))
  const proximos = doDia.filter(c => c.dataHoraAgendamento && new Date(c.dataHoraAgendamento) > agora && c.status !== 'CANCELADO')
    .sort((a, b) => a.dataHoraAgendamento.localeCompare(b.dataHoraAgendamento))
    .slice(0, 5)

  const resumo = [
    { label: 'Consultas', valor: doDia.filter(c => c.tipoConsulta === 'PRIMEIRA').length },
    { label: 'Retornos', valor: doDia.filter(c => c.tipoConsulta === 'RETORNO').length },
    { label: 'Pendentes', valor: proximos.length },
    { label: 'Canceladas', valor: doDia.filter(c => c.status === 'CANCELADO').length },
  ]

  // Monta eventos do calendário usando campos V2
  const eventos = consultas.map(c => ({
    id: c.id,
    title: c.nomeCompleto,
    start: c.dataHoraAgendamento,
    end: c.fim,
    color: c.status === 'CANCELADO' ? '#ef4444' : (CORES[c.tipoConsulta] || '#6b7280'),
    extendedProps: c,
  }))

  const hora = agora.getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  const formatarHora = (iso: string) =>
    new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  // ── Dashboard principal ───────────────────────────────────────────────────
  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.greeting}>{saudacao}, Dr Guilherme</h1>
              <button onClick={() => router.push(ROUTES.catalog)}></button>
              {/* TEMPORÁRIO - Link para testar Form */}
              <button onClick={() => router.push(ROUTES.form)} style={{padding:'8px 20px',background:'#5bbfb6',color:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'0.85rem'}}>Ir para Form (teste)</button>


        <div className={styles.content}>
          <div className={styles.calendarWrapper}>
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              locale="pt-br"
              height="100%"
              headerToolbar={{ left: 'prev,next', center: 'title', right: 'timeGridWeek,timeGridDay' }}
              events={eventos}
              editable={true}
              selectable={true}
              eventClick={(info: any) => setSelecionada(info.event.extendedProps)}
            />
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.resumoCard}>
              <h2 className={styles.cardTitle}>Resumo de hoje</h2>
              <div className={styles.resumoGrid}>
                {resumo.map(item => (
                  <div key={item.label} className={styles.resumoItem}>
                    <span className={styles.resumoValue}>{item.valor}</span>
                    <span className={styles.resumoLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.pacientesCard}>
              <h2 className={styles.cardTitle}>Próximos pacientes</h2>
              {proximos.length === 0
                ? <p className={styles.emptyMessage}>Sem consultas restantes hoje.</p>
                : (
                  <ul className={styles.pacientesList}>
                    {proximos.map(p => (
                      <li key={p.id} className={styles.pacienteItem}>
                        <span className={styles.pacienteNome}>{p.nomeCompleto}</span>
                        <span className={styles.pacienteHora}>{formatarHora(p.dataHoraAgendamento)}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
            </div>
          </aside>
        </div>

        {/* Modal de detalhe da consulta */}
        {selecionada && (
          <DetalheConsulta
            consulta={selecionada}
            onVoltar={() => setSelecionada(null)}
          />
        )}
      </div>




    </>
  )
}