export async function consultarMedicos(token) {

  const response = await fetch('http://localhost:8080/medicos',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
  )
  const data = await response.json()

  return data
}

export async function cadastrarMedico(dados, token) {
  const response = await fetch('http://localhost:8080/medicos',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    }
  )
  return response.json();
}

export async function deletarMedico(id, token) {
  const response = await fetch(`http://localhost:8080/medicos/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
  )
    console.log("TOKEN RECEBIDO", token)

}





