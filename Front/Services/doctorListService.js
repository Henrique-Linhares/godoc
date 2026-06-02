
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
  const data = await response.json()

  return data
}

export async function criarConta(dados) {
  const response = await fetch('http://localhost:8080/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    }

  )

}

export async function consultarMedicos(token) {

  const response = await fetch('http://localhost:8080/medicos',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

  const data = await response.json()

  return data
}

export async function cosultarPacientes() {
  const response = await fetch('http://localhost:8080/pacientes')
  const data = await response.json()

  return data

}






