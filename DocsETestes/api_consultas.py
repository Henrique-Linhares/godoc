# API de consultas GoDoc - script de TESTE (V2)
# Rodar: python api_consultas.py
# Instalar: pip install flask flask-cors

# ---------------------------------------------------------------------------
# JSON de exemplo baseado na documentacao_api_agendamento_v2.docx:
#
# {
#   "nomeCompleto": "Guilherme Soares da Silva",
#   "dataNascimento": "2006-01-18",
#   "idade": 20,
#   "cpf": "12345678900",
#   "email": "guilherme@email.com",
#   "telefone": "16999999999",
#   "tipoConsulta": "PRIMEIRA",
#   "convenio": "UNIMED",
#   "numeroCarteirinhaPlano": "001234567890123",
#   "motivoConsulta": "Dor lombar persistente após treinos físicos intensos.",
#   "modalidade": "PRESENCIAL",
#   "dataHoraAgendamento": "2026-05-25T14:30:00Z",
#   "idPaciente": "a5b8c3d2-e1f4-5a6b-7c8d-9e0f1a2b3c4d",
#   "idMedico": "7f8e9d0c-1b2a-3f4e-5d6c-7b8a9e0f1a2b",
#   "status": "AGENDADO"
# }
#
# Obs: "fim" não vem do frontend — o backend calcula como inicio + 1 hora.
# ---------------------------------------------------------------------------

from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

consultas = [
    # ── HOJE (2026-05-21) ──
    { "id": "1",  "nomeCompleto": "Dr. Cleiton Rasta",     "dataHoraAgendamento": "2026-05-21T08:00", "tipoConsulta": "PRIMEIRA",  "status": "CONCLUIDO",  "modalidade": "PRESENCIAL",    "convenio": "PARTICULAR",      "numeroCarteirinhaPlano": None,    "motivoConsulta": "Consulta de rotina",     "dataNascimento": "1978-03-10", "idade": 48, "cpf": "123.456.789-00", "telefone": "(11) 99999-0001", "email": "cleiton@email.com",   "idPaciente": "p001", "idMedico": "m001" },
    { "id": "2",  "nomeCompleto": "Junior Cleinton",        "dataHoraAgendamento": "2026-05-21T09:00", "tipoConsulta": "RETORNO",   "status": "CONCLUIDO",  "modalidade": "PRESENCIAL",    "convenio": "UNIMED",          "numeroCarteirinhaPlano": "51648",  "motivoConsulta": "Dor nas costas",         "dataNascimento": "1995-07-22", "idade": 30, "cpf": "987.654.321-00", "telefone": "(11) 99999-0002", "email": "junior@email.com",    "idPaciente": "p002", "idMedico": "m001" },
    { "id": "3",  "nomeCompleto": "Henrique Linhares",      "dataHoraAgendamento": "2026-05-21T10:00", "tipoConsulta": "RETORNO",   "status": "CONCLUIDO",  "modalidade": "TELECONSULTA",  "convenio": "PARTICULAR",      "numeroCarteirinhaPlano": None,    "motivoConsulta": "Retorno pós-exame",      "dataNascimento": "2000-01-15", "idade": 26, "cpf": "111.222.333-44", "telefone": "(18) 99999-0003", "email": "henrique@email.com",  "idPaciente": "p003", "idMedico": "m001" },
    { "id": "4",  "nomeCompleto": "Ana Souza",              "dataHoraAgendamento": "2026-05-21T11:00", "tipoConsulta": "PRIMEIRA",  "status": "CONCLUIDO",  "modalidade": "PRESENCIAL",    "convenio": "BRADESCO_SAUDE",  "numeroCarteirinhaPlano": "78901",  "motivoConsulta": "Cefaleia frequente",     "dataNascimento": "1985-11-30", "idade": 40, "cpf": "222.333.444-55", "telefone": "(18) 99999-0004", "email": "ana@email.com",       "idPaciente": "p004", "idMedico": "m001" },
    { "id": "5",  "nomeCompleto": "Carlos Mendes",          "dataHoraAgendamento": "2026-05-21T14:00", "tipoConsulta": "PRIMEIRA",  "status": "AGENDADO",   "modalidade": "PRESENCIAL",    "convenio": "PARTICULAR",      "numeroCarteirinhaPlano": None,    "motivoConsulta": "Check-up geral",         "dataNascimento": "1990-06-18", "idade": 35, "cpf": "333.444.555-66", "telefone": "(18) 99999-0005", "email": "carlos@email.com",    "idPaciente": "p005", "idMedico": "m001" },
    { "id": "6",  "nomeCompleto": "Fernanda Lima",          "dataHoraAgendamento": "2026-05-21T15:00", "tipoConsulta": "PRIMEIRA",  "status": "AGENDADO",   "modalidade": "PRESENCIAL",    "convenio": "AMIL",            "numeroCarteirinhaPlano": "32100",  "motivoConsulta": "Tontura e enjoos",       "dataNascimento": "1993-04-05", "idade": 33, "cpf": "444.555.666-77", "telefone": "(18) 99999-0006", "email": "fernanda@email.com",  "idPaciente": "p006", "idMedico": "m001" },
    { "id": "7",  "nomeCompleto": "Roberto Alves",          "dataHoraAgendamento": "2026-05-21T16:00", "tipoConsulta": "RETORNO",   "status": "AGENDADO",   "modalidade": "PRESENCIAL",    "convenio": "SULAMERICA",      "numeroCarteirinhaPlano": "99887",  "motivoConsulta": "Acompanhamento pressão", "dataNascimento": "1965-08-12", "idade": 60, "cpf": "555.666.777-88", "telefone": "(16) 99353-6709", "email": "roberto@gmail.com",   "idPaciente": "p008", "idMedico": "m001" },
    { "id": "8",  "nomeCompleto": "Mariana Costa",          "dataHoraAgendamento": "2026-05-21T17:00", "tipoConsulta": "PRIMEIRA",  "status": "AGENDADO",   "modalidade": "TELECONSULTA",  "convenio": "PARTICULAR",      "numeroCarteirinhaPlano": None,    "motivoConsulta": "Ansiedade e estresse",   "dataNascimento": "1998-02-28", "idade": 28, "cpf": "666.777.888-99", "telefone": "(18) 99999-0009", "email": "mariana@email.com",   "idPaciente": "p009", "idMedico": "m001" },
    { "id": "9",  "nomeCompleto": "Pedro Oliveira",         "dataHoraAgendamento": "2026-05-21T18:00", "tipoConsulta": "PRIMEIRA",  "status": "CANCELADO",  "modalidade": "PRESENCIAL",    "convenio": "UNIMED",          "numeroCarteirinhaPlano": "11223",  "motivoConsulta": "Dor de cabeça intensa",  "dataNascimento": "1987-09-03", "idade": 38, "cpf": "777.888.999-00", "telefone": "(18) 99999-0010", "email": "pedro@email.com",     "idPaciente": "p010", "idMedico": "m001" },
    # ── AMANHÃ (2026-05-22) ──
    { "id": "10", "nomeCompleto": "Juliana Ferreira",       "dataHoraAgendamento": "2026-05-22T08:00", "tipoConsulta": "RETORNO",   "status": "AGENDADO",   "modalidade": "PRESENCIAL",    "convenio": "PARTICULAR",      "numeroCarteirinhaPlano": None,    "motivoConsulta": "Insônia crônica",        "dataNascimento": "1992-12-20", "idade": 33, "cpf": "888.999.000-11", "telefone": "(18) 99999-0011", "email": "juliana@email.com",   "idPaciente": "p011", "idMedico": "m001" },
    { "id": "11", "nomeCompleto": "Lucas Martins",          "dataHoraAgendamento": "2026-05-22T09:00", "tipoConsulta": "PRIMEIRA",  "status": "AGENDADO",   "modalidade": "TELECONSULTA",  "convenio": "BRADESCO_SAUDE",  "numeroCarteirinhaPlano": "44556",  "motivoConsulta": "Tremores nas mãos",      "dataNascimento": "2002-05-11", "idade": 23, "cpf": "999.000.111-22", "telefone": "(18) 99999-0012", "email": "lucas@email.com",     "idPaciente": "p012", "idMedico": "m001" },
    { "id": "12", "nomeCompleto": "Ana Souza",              "dataHoraAgendamento": "2026-05-22T10:00", "tipoConsulta": "RETORNO",   "status": "AGENDADO",   "modalidade": "PRESENCIAL",    "convenio": "BRADESCO_SAUDE",  "numeroCarteirinhaPlano": "78901",  "motivoConsulta": "Retorno pós-medicação",  "dataNascimento": "1985-11-30", "idade": 40, "cpf": "222.333.444-55", "telefone": "(18) 99999-0004", "email": "ana@email.com",       "idPaciente": "p004", "idMedico": "m001" },
    { "id": "13", "nomeCompleto": "Beatriz Santos",         "dataHoraAgendamento": "2026-05-22T14:00", "tipoConsulta": "PRIMEIRA",  "status": "AGENDADO",   "modalidade": "PRESENCIAL",    "convenio": "AMIL",            "numeroCarteirinhaPlano": "66778",  "motivoConsulta": "Dor nas articulações",   "dataNascimento": "1996-03-14", "idade": 30, "cpf": "100.200.300-40", "telefone": "(18) 99999-0014", "email": "beatriz@email.com",   "idPaciente": "p014", "idMedico": "m001" },
    { "id": "14", "nomeCompleto": "Gabriel Rocha",          "dataHoraAgendamento": "2026-05-22T15:00", "tipoConsulta": "PRIMEIRA",  "status": "AGENDADO",   "modalidade": "TELECONSULTA",  "convenio": "PARTICULAR",      "numeroCarteirinhaPlano": None,    "motivoConsulta": "Cansaço excessivo",      "dataNascimento": "2001-07-07", "idade": 24, "cpf": "200.300.400-50", "telefone": "(18) 99999-0015", "email": "gabriel@email.com",   "idPaciente": "p015", "idMedico": "m001" },
    { "id": "15", "nomeCompleto": "Reunião de equipe",      "dataHoraAgendamento": "2026-05-22T16:00", "tipoConsulta": "PRIMEIRA",  "status": "AGENDADO",   "modalidade": "PRESENCIAL",    "convenio": "PARTICULAR",      "numeroCarteirinhaPlano": None,    "motivoConsulta": None,                     "dataNascimento": None,         "idade": None, "cpf": None,             "telefone": None,              "email": None,                  "idPaciente": None,   "idMedico": "m001" },
]

def calcular_fim(inicio: str) -> str:
    dt = datetime.fromisoformat(inicio)
    return (dt + timedelta(hours=1)).strftime('%Y-%m-%dT%H:%M')

@app.route('/api/consultas', methods=['GET'])
def get_consultas():
    resultado = [{ **c, "fim": calcular_fim(c["dataHoraAgendamento"]) } for c in consultas]
    return jsonify(resultado)

@app.route('/api/consultas/<id>', methods=['GET'])
def get_consulta(id):
    consulta = next((c for c in consultas if c["id"] == id), None)
    if consulta is None:
        return jsonify({ "erro": "Consulta não encontrada" }), 404
    return jsonify({ **consulta, "fim": calcular_fim(consulta["dataHoraAgendamento"]) })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
