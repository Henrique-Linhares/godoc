
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

export async function cosultarPacientes() {
  const response = await fetch('http://localhost:8080/pacientes')
  const data = await response.json()

  return data

}

export async function deletarPacientes(id) {
const response = await fetch(`http://localhost:8080/pacientes/${id}` ,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
 
}


