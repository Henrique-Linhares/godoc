export async function criarConta(dados) {
  console.log(dados);
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  });
  return response.json();
}



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

