'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

import { ROUTES } from '@/routes/routes'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/Button/Button/Button'

import CreateDoctor from '@/app/components/Doctor/CreateDoctor/CreateDoctor'
import GetDoctor from '@/app/components/Doctor/CreateDoctor/GetDoctor/GetDoctor'
import CreatePacient from '@/app/components/Pacient/CreatePacient'
import GetPacient from '@/app/components/Pacient/GetPacient/GetPacient'
import Catalog from '@/app/components/Catalog/page'
import Calendar from '@/app/components/FullCalendar/FullCalendar'

import { consultarMedicos } from '@/Services/doctorListService'
import { useDoc } from '@/context/Doc'

export default function Dashboard() {
  const router = useRouter()
  const { setDoc } = useDoc()

  const [pacientArray, setpacientArray] = useState([
  {
    id: 1,
    title: 'Criar Paciente',
    variant: 'dashboard-subMenu',
    activated: false,
    identifier: 'Pass',
    onClick: () => router.push(ROUTES.userForm),
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Listar Pacientes',
    variant: 'dashboard-subMenu',
    activated: false,
    identifier: 'Get Pacient',
    onClick: () => {},
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6h11" />
        <path d="M8 12h11" />
        <path d="M8 18h11" />
        <circle cx="4" cy="6" r="1" fill="white" stroke="none" />
        <circle cx="4" cy="12" r="1" fill="white" stroke="none" />
        <circle cx="4" cy="18" r="1" fill="white" stroke="none" />
      </svg>
    )
  }
])

  const [doctorArray, setDoctorArray] = useState([
    {
      id: 1,
      title: 'Criar Médico',
      variant: 'dashboard-subMenu',
      activated: false,
      identifier: 'Create_doctor',
      onClick: () => { },
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      )

    },
    {
      id: 2,
      title: 'Listar Médicos',
      variant: 'dashboard-subMenu',
      activated: false,
      identifier: 'Get Doctor',
      onClick: () => { },
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 6h11" />
          <path d="M8 12h11" />
          <path d="M8 18h11" />
          <circle cx="4" cy="6" r="1" fill="white" stroke="none" />
          <circle cx="4" cy="12" r="1" fill="white" stroke="none" />
          <circle cx="4" cy="18" r="1" fill="white" stroke="none" />
        </svg>
      )
    }
  ])

  useEffect(() => {
    let parsed = ''
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      parsed = JSON.parse(storedUser).token
    }

    const handleDoctors = async () => {
      try {
        const data = await consultarMedicos(parsed)
        if (data) {
          setDoc(data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    handleDoctors()
  }, [setDoc])

  const [activeView, setActiveView] = useState('Callendar')
  const [activeSubMenu, setActiveSubMenu] = useState('')

  const selectItem = (selectedIndex: number) => {
    setpacientArray(prev =>
      prev.map((item, index) => ({
        ...item,
        activated: index === selectedIndex
      }))
    )
  }

  const selectDoctorItem = (selectedIndex: number) => {
    setDoctorArray(prev =>
      prev.map((item, index) => ({
        ...item,
        activated: index === selectedIndex
      }))
    )
  }

  const handleView = (identifier: string) => {
    if (identifier === 'Pass') {
      setActiveSubMenu('Create Pacient')
      if (activeView !== 'Menu Pacient') {
        setActiveView('')
      }
    }

    if (identifier === 'Create_doctor') {
      setActiveSubMenu('Create Doctor')
      if (activeView !== 'Menu Doctor') {
        setActiveView('')
      }
    }

    if (identifier === 'Get Pacient') {
      setActiveSubMenu('Get Pacient')
      if (activeView !== 'Menu Pacient') {
        setActiveView('')
      }
    }

    if (identifier === 'Get Doctor') {
      setActiveSubMenu('Get Doctor')
      if (activeView !== 'Menu Doctor') {
        setActiveView('')
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h1 className={styles.title}>Menu</h1>

        <div className={styles.buttonBox}>
          <div className={styles.button} onClick={() => { setActiveView('Callendar'); setActiveSubMenu('') }}>
            <div className={styles.headerIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>

            <h2>Calendario</h2>
          </div>

          <div className={styles.button} onClick={() => { setActiveView('Catalog'); setActiveSubMenu('') }}>
            <div className={styles.headerIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="9" x2="9" y2="21" />
              </svg>
            </div>
            <h2>Catalogo</h2>
          </div>

          <div className={styles.button} onClick={() => { setActiveView('Menu Pacient'); setActiveSubMenu('Create Pacient') }}>
            <div className={styles.headerIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2>Paciente</h2>
          </div>

          {activeView === 'Menu Pacient' && (
            <div className={styles.submenu}>
              {pacientArray.map((item, index) => (
                <div
                  key={item.id}
                  className={styles.buttonSub}
                  onClick={() => {
                    selectItem(index)
                    handleView(item.identifier)
                  }}
                >
                  <div className={styles.subIcon}>
                    <h2>{item.icon}</h2>
                  </div>

                  <div className={styles.subTitle}>
                    <h2>{item.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={activeView === 'Menu Doctor' ? styles.buttonSelected : styles.button} onClick={() => { setActiveView('Menu Doctor'); setActiveSubMenu('Create Doctor') }}>
            <div className={styles.headerIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
            <h2>Doutor</h2>
          </div>

          {activeView === 'Menu Doctor' && (
            <div className={styles.submenu}>
              {doctorArray.map((item, index) => (
                <div className={styles.buttonSub} onClick={() => {
                  selectDoctorItem(index)
                  handleView(item.identifier)
                }}>
                  <div className={styles.subIcon}>
                    <h2>{item.icon}</h2>
                  </div>
                  <div className={styles.subTitle}>
                    <h2>{item.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          {activeView === 'Doctor' && <CreateDoctor />}
          {activeView === 'Catalog' && <Catalog />}
          {activeView === 'Callendar' && <Calendar />}
          {activeSubMenu === 'Create Doctor' && <CreateDoctor />}
          {activeSubMenu === 'Create Pacient' && <CreatePacient />}
          {activeSubMenu === 'Get Pacient' && <GetPacient />}
          {activeSubMenu === 'Get Doctor' && <GetDoctor />}
        </div>
      </div>
    </div>
  )
}