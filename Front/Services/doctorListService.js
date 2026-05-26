const token = ''


export async function login(dados) {
  const response = await fetch('http://localhost:8080/auth/login',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(dados)
    }
  )
  return await response.json()
}

export async function consultarMedicos() {

  const response = await fetch('http://localhost:8080/medicos')
  const data = await response.json()

  return data
}



