
export async function criarAgendamento(dados: any, token: string) {
  const response = await fetch('http://localhost:8080/agendamentos', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || `Erro ao criar agendamento (${response.status})`);
  }

  return await response.json();
}
