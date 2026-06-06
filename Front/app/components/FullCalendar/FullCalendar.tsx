'use client'

import { useEffect, useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import styles from './FullCalendar.module.css'
import DetalheConsulta from './Consulta/DetalheConsulta'

const CORES: Record<string, string> = {
  PRIMEIRA: '#3b82f6',
  RETORNO: '#10b981'
}

export default function Calendar() {
  const [consultas, setConsultas] = useState<any[]>([])
  const [selecionada, setSelecionada] = useState<any | null>(null)

  useEffect(() => {
    const hoje = new Date()

    const criarData = (
      diaOffset: number,
      horaInicio: number,
      minutoInicio: number,
      duracaoMinutos: number
    ) => {
      const inicio = new Date(hoje)

      inicio.setDate(inicio.getDate() + diaOffset)
      inicio.setHours(horaInicio, minutoInicio, 0, 0)

      const fim = new Date(inicio)
      fim.setMinutes(fim.getMinutes() + duracaoMinutos)

      return {
        inicio: inicio.toISOString(),
        fim: fim.toISOString()
      }
    }

    const consulta1 = criarData(0, 9, 0, 60)
    const consulta2 = criarData(0, 11, 0, 30)
    const consulta3 = criarData(0, 14, 0, 45)
    const consulta4 = criarData(1, 10, 0, 60)
    const consulta5 = criarData(2, 15, 30, 30)

    setConsultas([
      {
        id: 1,
        nomeCompleto: 'João Silva',
        dataHoraAgendamento: consulta1.inicio,
        fim: consulta1.fim,
        tipoConsulta: 'PRIMEIRA',
        status: 'AGENDADO'
      },
      {
        id: 2,
        nomeCompleto: 'Maria Oliveira',
        dataHoraAgendamento: consulta2.inicio,
        fim: consulta2.fim,
        tipoConsulta: 'RETORNO',
        status: 'AGENDADO'
      },
      {
        id: 3,
        nomeCompleto: 'Pedro Santos',
        dataHoraAgendamento: consulta3.inicio,
        fim: consulta3.fim,
        tipoConsulta: 'PRIMEIRA',
        status: 'AGENDADO'
      },
      {
        id: 4,
        nomeCompleto: 'Ana Costa',
        dataHoraAgendamento: consulta4.inicio,
        fim: consulta4.fim,
        tipoConsulta: 'RETORNO',
        status: 'AGENDADO'
      },
      {
        id: 5,
        nomeCompleto: 'Carlos Mendes',
        dataHoraAgendamento: consulta5.inicio,
        fim: consulta5.fim,
        tipoConsulta: 'PRIMEIRA',
        status: 'CANCELADO'
      }
    ])
  }, [])

  const hoje = new Date().toISOString().slice(0, 10)
  const agora = new Date()

  const doDia = consultas.filter(c =>
    c.dataHoraAgendamento?.startsWith(hoje)
  )

  const proximos = doDia
    .filter(
      c =>
        c.dataHoraAgendamento &&
        new Date(c.dataHoraAgendamento) > agora &&
        c.status !== 'CANCELADO'
    )
    .sort((a, b) =>
      a.dataHoraAgendamento.localeCompare(b.dataHoraAgendamento)
    )
    .slice(0, 5)

  const resumo = [
    {
      label: 'Consultas',
      valor: doDia.filter(c => c.tipoConsulta === 'PRIMEIRA').length
    },
    {
      label: 'Retornos',
      valor: doDia.filter(c => c.tipoConsulta === 'RETORNO').length
    },
    {
      label: 'Pendentes',
      valor: proximos.length
    },
    {
      label: 'Canceladas',
      valor: doDia.filter(c => c.status === 'CANCELADO').length
    }
  ]

  const eventos = consultas.map(c => ({
    id: String(c.id),
    title: c.nomeCompleto,
    start: c.dataHoraAgendamento,
    end: c.fim,
    color:
      c.status === 'CANCELADO'
        ? '#ef4444'
        : CORES[c.tipoConsulta] || '#6b7280',
    extendedProps: c
  }))

  const formatarHora = (iso: string) =>
    new Date(iso).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })

  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <div className={styles.calendarWrapper}>
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              height="100%"
              locale="pt-br"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              events={eventos}
              editable
              selectable
              eventClick={(info) =>
                setSelecionada(info.event.extendedProps)
              }
            />
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.resumoCard}>
            <h2 className={styles.cardTitle}>
              Resumo de hoje
            </h2>

            <div className={styles.resumoGrid}>
              {resumo.map(item => (
                <div
                  key={item.label}
                  className={styles.resumoItem}
                >
                  <span className={styles.resumoValue}>
                    {item.valor}
                  </span>

                  <span className={styles.resumoLabel}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.pacientesCard}>
            <h2 className={styles.cardTitle}>
              Próximos pacientes
            </h2>

            {proximos.length === 0 ? (
              <p className={styles.emptyMessage}>
                Sem consultas restantes hoje.
              </p>
            ) : (
              <ul className={styles.pacientesList}>
                {proximos.map((p) => (
                  <li
                    key={p.id}
                    className={styles.pacienteItem}
                  >
                    <span className={styles.pacienteNome}>
                      {p.nomeCompleto}
                    </span>

                    <span className={styles.pacienteHora}>
                      {formatarHora(
                        p.dataHoraAgendamento
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {selecionada && (
        <DetalheConsulta
          consulta={selecionada}
          onVoltar={() => setSelecionada(null)}
        />
      )}
    </>
  )
}