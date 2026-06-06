'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

import { ROUTES } from '@/routes/routes'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/Button/Button/Button'

import CreateDoctor from '@/app/components/Doctor/CreateDoctor/page'

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
      onClick: () => {}
    }
  ])

  const [doctorArray, setDoctorArray] = useState([
    {
      id: 1,
      title: 'Criar Médico',
      variant: 'dashboard-subMenu',
      activated: true,
      identifier: 'Create_doctor',
      onClick: () => {}
    },
    {
      id: 2,
      title: 'Listar Médicos',
      variant: 'dashboard-subMenu',
      activated: false,
      identifier: 'DL',
      onClick: () => {}
    }
  ])

  const [openCatalog, setOpenCatalog] = useState(false)
  const [openCallendar, setOpenCallendar] = useState(true)

  const [openMenuPaciente, setopenMenuPaciente] = useState(false)
  const [openCreatePacient, setopenCreatePacient] = useState(false)

  const [openMenuDoctor, setOpenMenuDoctor] = useState(false)
  const [openCreateDocor, setopenCreateDocor] = useState(false)

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
    setopenCreatePacient(false)
    setopenCreateDocor(false)

    if (identifier === 'Pass') {
      setopenCreatePacient(true)
    }

    if (identifier === 'Create_doctor') {
      setopenCreateDocor(true)
    }
  }

  useEffect(() => {
    console.log(pacientArray)
  }, [pacientArray])

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h1 className={styles.greeting}>Dashboard</h1>

        <div className={styles.buttonBox}>
          <Button
            onClick={() => setOpenCallendar(!openCallendar)}
            type="text"
            variant={openCallendar ? 'dashboard-selected' : 'dashboard'}
            text="Calendario"
          />

          <Button
            onClick={() => setOpenCatalog(!openCatalog)}
            type="text"
            variant={openCatalog ? 'dashboard-selected' : 'dashboard'}
            text="Catalogo"
          />

          <Button
            onClick={() => setopenMenuPaciente(!openMenuPaciente)}
            type="text"
            variant={openMenuPaciente ? 'dashboard-selected' : 'dashboard'}
            text={openMenuPaciente ? 'Paciente ▼' : 'Paciente ▲'}
          />

          <div className={styles.subMenu}>
            {openMenuPaciente && (
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
            onClick={() => setOpenMenuDoctor(!openMenuDoctor)}
            type="text"
            variant={openMenuDoctor ? 'dashboard-selected' : 'dashboard'}
            text={openMenuDoctor ? 'Doutor ▼' : 'Doutor ▲'}
          />

          <div className={styles.subMenu}>
            {openMenuDoctor && (
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
          {openCreatePacient && <Catalog />}
          {openCreateDocor && <CreateDoctor />}
          {openCatalog && <Catalog />}
          {openCallendar && <Calendar />}
        </div>
      </div>
    </div>
  )
}