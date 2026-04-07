import styles from './page.module.css'


const data =[
    {
        title: "Cuide da sua saúde",
        description: "No GoDoc você encontra médicos perto de você e agenda consultas em poucos cliques - sem filas,sem complicação e sem perder tempo"
    },
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
                <h2>{data[0].title}</h2>
                <p>{data[0].description}</p>
            </div>
            <div> 
                <div>

                </div>
                <div>

                </div>
            </div>
            
        </div>
    )
}

export default LandingPage;