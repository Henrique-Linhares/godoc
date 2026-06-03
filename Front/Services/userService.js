export async function criarConta(dados, token) {
  const response = await fetch('http://localhost:8080/auth/register',
    console.log(dados),
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