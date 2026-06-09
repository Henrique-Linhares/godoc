'use client'

import { useState, useMemo, useEffect } from 'react'
import Button from '@/app/components/Button/Button/Button'
import styles from './page.module.css'
import { ROUTES } from '@/routes/routes'
import { useRouter } from 'next/navigation'
import { criarAgendamentoPublico } from '@/Services/agendamentoService'
import { consultarMedicos } from '@/Services/doctorListService'
import Swal from 'sweetalert2'

// Horários fixos disponíveis (slots de 1h)
const HORARIOS = [
  '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
]

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

function formatarData(ano: number, mes: number, dia: number): string {
  return `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
}

function formatarDataExibicao(dataStr: string): string {
  const [ano, mes, dia] = dataStr.split('-')
  return `${dia}/${mes}/${ano}`
}

export default function FormAgendamento() {

  const router = useRouter()

  // Estados para Médicos (Dinâmico)
  const [medicos, setMedicos] = useState<any[]>([])
  const [medicoSelecionadoId, setMedicoSelecionadoId] = useState('')

  // Dados pessoais
  const [nome, setNome] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [idade, setIdade] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  // Informações de saúde
  const [primeiraConsulta, setPrimeiraConsulta] = useState(true)
  const [convenio, setConvenio] = useState('')
  const [carteirinha, setCarteirinha] = useState('')
  const [motivo, setMotivo] = useState('')

  // Modalidade
  const [modalidade, setModalidade] = useState('PRESENCIAL')

  // Calendário
  const hoje = new Date()
  const [mesAtual, setMesAtual] = useState(hoje.getMonth())
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear())
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horarioSelecionado, setHorarioSelecionado] = useState('')

  // Feedback
  const [enviando, setEnviando] = useState(false)
  const [sucesso, setSucesso] = useState('')
  const [erro, setErro] = useState('')

  // BUSCAR MÉDICOS ASSIM QUE A TELA CARREGAR
  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await consultarMedicos()
        setMedicos(dados)
      } catch (err: any) {
        setErro('Erro ao carregar a lista de médicos disponíveis.')
      }
    }
    carregarDados()
  }, [])

  // Gerar dias do mês para o calendário
  const diasDoMes = useMemo(() => {
    const primeiroDia = new Date(anoAtual, mesAtual, 1)
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0)
    const diasAntes = primeiroDia.getDay()
    const totalDias = ultimoDia.getDate()

    const dias: { dia: number; desabilitado: boolean; vazio: boolean }[] = []

    for (let i = 0; i < diasAntes; i++) {
      dias.push({ dia: 0, desabilitado: true, vazio: true })
    }

    for (let d = 1; d <= totalDias; d++) {
      const dataComparar = new Date(anoAtual, mesAtual, d)
      const hojeInicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
      dias.push({
        dia: d,
        desabilitado: dataComparar < hojeInicio,
        vazio: false
      })
    }

    return dias
  }, [mesAtual, anoAtual])

  function mesAnterior() {
    if (mesAtual === 0) {
      setMesAtual(11)
      setAnoAtual(anoAtual - 1)
    } else {
      setMesAtual(mesAtual - 1)
    }
  }

  function proximoMes() {
    if (mesAtual === 11) {
      setMesAtual(0)
      setAnoAtual(anoAtual + 1)
    } else {
      setMesAtual(mesAtual + 1)
    }
  }

  function selecionarDia(dia: number) {
    const novaData = formatarData(anoAtual, mesAtual, dia)
    setDataSelecionada(novaData)
    setHorarioSelecionado('')
  }

  function ehHoje(dia: number): boolean {
    return (
      dia === hoje.getDate() &&
      mesAtual === hoje.getMonth() &&
      anoAtual === hoje.getFullYear()
    )
  }

  function ehSelecionado(dia: number): boolean {
    return dataSelecionada === formatarData(anoAtual, mesAtual, dia)
  }

async function handleConfirmarAgendamento() {
  setErro('')
  setSucesso('')
  
  if (!medicoSelecionadoId) { setErro('Selecione um médico para o atendimento.'); return }
  if (!nome.trim()) { setErro('Preencha o nome completo.'); return }
  if (!dataNascimento) { setErro('Preencha a data de nascimento.'); return }
  if (!idade) { setErro('Preencha a idade.'); return }
  if (!cpf.trim()) { setErro('Preencha o CPF.'); return }
  if (!telefone.trim()) { setErro('Preencha o telefone.'); return }
  if (!dataSelecionada) { setErro('Selecione uma data no calendário.'); return }
  if (!horarioSelecionado) { setErro('Selecione um horário.'); return }

  const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-')
  const dataNascimentoFormatada = `${diaNasc}-${mesNasc}-${anoNasc}`

  const payload = {
    nomePaciente: nome,
    idadePaciente: parseInt(idade),
    cpfPaciente: cpf.replace(/\D/g, ''),
    dataNascimentoPaciente: dataNascimentoFormatada,
    telefonePaciente: telefone.replace(/\D/g, ''),
    idMedico: parseInt(medicoSelecionadoId),
    tipoConsulta: primeiraConsulta ? 'PRIMEIRA' : 'RETORNO',
    convenio: convenio ? convenio.toUpperCase() : null,
    numeroCarteirinhaPlano: carteirinha || null,
    motivoConsulta: motivo || null,
    modalidade: modalidade,
    status: 'AGENDADO',
    dataHoraAgendamento: `${dataSelecionada}T${horarioSelecionado}:00Z`
  }

  Swal.fire({
    title: 'Processando agendamento...',
    text: 'Estamos validando seus dados e enviando a confirmação.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  setEnviando(true)

  try {
    await criarAgendamentoPublico(payload)
    Swal.fire({
      icon: 'success',
      title: 'Agendamento Confirmado!',
      text: 'Sua consulta foi reservada com sucesso. Você receberá uma notificação em breve.',
      confirmButtonColor: '#00c1a4',
      timer: 3000,
      timerProgressBar: true
    })

    setTimeout(() => {
      router.push(ROUTES.catalog)
    }, 3000)

  } catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Ops! Falha no agendamento',
      text: err.message || 'Verifique se o horário escolhido já não está ocupado.',
      confirmButtonColor: '#d33'
    })
    
    setErro(err.message || 'Erro ao criar agendamento.')
  } finally {
    setEnviando(false)
  }
}

  return (
    <div className={styles.page}>

      {/* Cabeçalho superior com botão de voltar */}
      <div className={styles.docSector} style={{ marginBottom: '20px' }}>
        <Button onClick={() => { router.push(ROUTES.catalog) }} type={'text'} variant={'default'} text={'‹ Voltar para o Catálogo'} />
      </div>

      {/* Conteúdo principal */}
      <div className={styles.content}>

        {/* Coluna esquerda - Formulário */}
        <div className={styles.formColumn}>

          {/* Seleção do Médico Dinâmica */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Profissional</h2>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Escolha o Médico*</label>
              <select
                className={styles.select}
                value={medicoSelecionadoId}
                onChange={(e) => setMedicoSelecionadoId(e.target.value)}
              >
                <option value="">Selecione um médico na lista...</option>
                {medicos.map((medico: any) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nome} - {medico.especialidade || 'Clínico Geral'}
                  </option>
                ))}
              </select>
            </div>
          </section>

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
                  type="button"
                  className={`${styles.toggleBtn} ${primeiraConsulta ? styles.toggleActive : ''}`}
                  onClick={() => setPrimeiraConsulta(true)}
                >
                  Sim, primeira vez
                </button>
                <button
                  type="button"
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
                  <option value="PARTICULAR">Particular</option>
                  <option value="UNIMED">Unimed</option>
                  <option value="SULAMERICA">SulAmérica</option>
                  <option value="BRADESCO_SAUDE">Bradesco Saúde</option>
                  <option value="AMIL">Amil</option>
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
                type="button"
                className={`${styles.toggleBtn} ${modalidade === 'PRESENCIAL' ? styles.toggleActive : ''}`}
                onClick={() => setModalidade('PRESENCIAL')}
              >
                Presencial
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${modalidade === 'ONLINE' ? styles.toggleActive : ''}`}
                onClick={() => setModalidade('ONLINE')}
              >
                Teleconsulta
              </button>
            </div>
          </section>

          {/* Feedback */}
          {sucesso && <div className={styles.successMessage}>{sucesso}</div>}
          {erro && <div className={styles.errorMessage}>{erro}</div>}

          <div className={styles.actions}>
            <button
              className={styles.confirmBtn}
              onClick={handleConfirmarAgendamento}
              disabled={enviando}
            >
              {enviando ? 'Enviando...' : 'Confirmar Agendamento'}
            </button>
          </div>
        </div>

        {/* Coluna direita - Calendário e Horários */}
        <div className={styles.scheduleColumn}>
          {/* O código do calendário e dos slots permanece igual */}
          <div className={styles.calendarContainer}>
            <h3 className={styles.scheduleTitle}>Selecione a data</h3>

            <div className={styles.calendarNav}>
              <button type="button" className={styles.calendarNavBtn} onClick={mesAnterior}>‹</button>
              <span className={styles.calendarMonthYear}>{MESES[mesAtual]} {anoAtual}</span>
              <button type="button" className={styles.calendarNavBtn} onClick={proximoMes}>›</button>
            </div>

            <div className={styles.calendarWeekdays}>
              {DIAS_SEMANA.map((dia) => (
                <span key={dia} className={styles.calendarWeekday}>{dia}</span>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {diasDoMes.map((item, index) => {
                if (item.vazio) return <div key={`empty-${index}`} className={styles.calendarDayEmpty} />

                const classes = [styles.calendarDay]
                if (item.desabilitado) classes.push(styles.calendarDayDisabled)
                if (ehHoje(item.dia)) classes.push(styles.calendarDayToday)
                if (ehSelecionado(item.dia)) classes.push(styles.calendarDaySelected)

                return (
                  <button
                    type="button"
                    key={`day-${item.dia}`}
                    className={classes.join(' ')}
                    onClick={() => selecionarDia(item.dia)}
                    disabled={item.desabilitado}
                  >
                    {item.dia}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Horários */}
          <div className={styles.timeSlotsContainer}>
            <h3 className={styles.scheduleTitle}>Horários</h3>
            {dataSelecionada ? (
              <>
                <span className={styles.timeSlotsLabel}>Horários para {formatarDataExibicao(dataSelecionada)}</span>
                <div className={styles.timeSlotGrid}>
                  {HORARIOS.map((horario) => (
                    <button
                      type="button"
                      key={horario}
                      className={`${styles.timeSlot} ${horarioSelecionado === horario ? styles.timeSlotSelected : ''}`}
                      onClick={() => setHorarioSelecionado(horario)}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className={styles.noSlotsMessage}>Selecione uma data para ver os horários</p>
            )}
          </div>

          {/* Resumo */}
          <div className={styles.selectedSlot}>
            <h4 className={styles.selectedTitle}>Horário Selecionado</h4>
            <span className={styles.selectedInfo}>
              {dataSelecionada && horarioSelecionado ? `${formatarDataExibicao(dataSelecionada)} às ${horarioSelecionado}` : 'Nenhum horário selecionado'}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}