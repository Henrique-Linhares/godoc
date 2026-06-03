
export async function cadastrarPaciente(dados, token) {
  const response = await fetch('http://localhost:8080/pacientes',
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


