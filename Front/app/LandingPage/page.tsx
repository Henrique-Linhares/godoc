import styles from './page.module.css'


const dataCard = {
    title: "Cuide da sua saúde",
    description: "No GoDoc você encontra médicos perto de você e agenda consultas em poucos cliques - sem filas,sem complicação e sem perder tempo"
}
const data = [
    {
        title: "Encontre",
        description: "Busque Medicos por especialidade, localização"
    },
    {
        title: "Agende em segundo",
        description: "Sem ligações, sem filas"
    },
    {
        title: "Escolha o melhor horário",
        description: "Veja datas disponíveis em tempo real"
    }
]

function LandingPage() {

    return (
        <div className={styles.container}>
            <div className={styles.info_card}>
                <h2>{dataCard.title}</h2>
                <p>{dataCard.description}</p>
            </div>
            <div>
                <div>

                </div>
                <div>
                    {data.map((item, index) => {
                        return (
                            <div key={index} className={styles.info_card}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default LandingPage;