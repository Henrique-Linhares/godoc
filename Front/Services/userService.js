export async function criarConta(dados) {
  const response = await fetch('http://localhost:8080/auth/register',
    //console.log(JSON.stringify(dados)),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    }
  )
  return response.json();
}