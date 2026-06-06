'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

import { ROUTES } from '@/routes/routes'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/Button/Button/Button'

import CreateDoctor from '@/app/components/Doctor/CreateDoctor/CreateDoctor'
import CreatePacient from '@/app/components/Pacient/CreatePacient'

import Catalog from '@/app/components/Catalog/page'
import Calendar from '@/app/components/FullCalendar/FullCalendar'

export default function Dashboard() {
  const router = useRouter()

  const [pacientArray, setpacientArray] = useState([
    {
      id: 1,
      title: 'Criar Paciente',
      variant: 'dashboard-subMenu',
      activated: true,
      identifier: 'Pass',
      onClick: () => router.push(ROUTES.userForm)
    },
    {
      id: 2,
      title: 'Listar Pacientes',
      variant: 'dashboard-subMenu',
      activated: false,
      identifier: 'PS',
      onClick: () => { }
    }
  ])

  const [doctorArray, setDoctorArray] = useState([
    {
      id: 1,
      title: 'Criar Médico',
      variant: 'dashboard-subMenu',
      activated: true,
      identifier: 'Create_doctor',
      onClick: () => { }
    },
    {
      id: 2,
      title: 'Listar Médicos',
      variant: 'dashboard-subMenu',
      activated: false,
      identifier: 'DL',
      onClick: () => { }
    }
  ])

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
      setActiveView('')
    }

    if (identifier === 'Create_doctor') {
      setActiveSubMenu('Create Doctor')
      setActiveView('')

    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h1 className={styles.greeting}>Dashboard</h1>

        <div className={styles.buttonBox}>
          <Button onClick={() => {setActiveView('Callendar'); setActiveSubMenu('')}}            
            type="text"
            variant={activeView === 'Callendar' ? 'dashboard-selected' : 'dashboard'}
            text="Calendario"
          />

          <Button
            onClick={() => {setActiveView('Catalog'); setActiveSubMenu('')}}
            type="text"
            variant={activeView === 'Catalog' ? 'dashboard-selected' : 'dashboard'}
            text="Catalogo"
          />

          <Button
            onClick={() => {setActiveView('Menu Pacient'); setActiveSubMenu('Create Pacient')}}
            type="text"
            variant={activeView === 'Menu Pacient' ? 'dashboard-selected' : 'dashboard'}
            text={activeView === 'Menu Pacient' ? 'Paciente ▼' : 'Paciente ▲'}
          />

          <div className={styles.subMenu}>
            {activeView === 'Menu Pacient' && (
              <div className={styles.submenu}>
                {pacientArray.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      selectItem(index)
                      handleView(item.identifier)
                    }}
                    type="text"
                    variant={
                      item.activated
                        ? 'dashboard-subMenu-activated'
                        : item.variant
                    }
                    text={item.title}
                  />
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={() => {setActiveView('Menu Doctor'); setActiveSubMenu('Create Doctor')}}
            type="text"
            variant={activeView === 'Menu Doctor' ? 'dashboard-selected' : 'dashboard'}
            text={activeView === 'Menu Doctor' ? 'Doutor ▼' : 'Doutor ▲'}
          />

          <div className={styles.subMenu}>
            {activeView === 'Menu Doctor' && (
              <div className={styles.submenu}>
                {doctorArray.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      selectDoctorItem(index)
                      handleView(item.identifier)
                    }}
                    type="text"
                    variant={
                      item.activated
                        ? 'dashboard-subMenu-activated'
                        : item.variant
                    }
                    text={item.title}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          {activeView === 'Doctor' && <CreateDoctor />}
          {activeView === 'Catalog' && <Catalog />}
          {activeView === 'Callendar' && <Calendar />}
          {activeSubMenu === 'Create Doctor' && <CreateDoctor />}
          {activeSubMenu === 'Create Pacient' && <CreatePacient />}
        </div>
      </div>
    </div>
  )
}