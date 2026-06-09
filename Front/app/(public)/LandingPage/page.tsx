'use client'

import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes/routes'
import { Search, CalendarCheck, Clock } from 'lucide-react'

const heroData = {
    title: "Marque suas consultas agora mesmo",
    cta: "Procure um especialista"
}

const sectionData = {
    title: "Cuide da sua saúde",
    description: "No GoDoc, você encontra médicos perto de você e agenda consultas em poucos cliques — sem filas, sem complicação e sem perder tempo."
}

const features = [
    {
        icon: Search,
        title: "Encontre",
        description: "Busque médicos por especialidade ou localização",
        color: "#2bbcd4"
    },
    {
        icon: CalendarCheck,
        title: "Agende em segundos",
        description: "Sem ligações, sem filas",
        color: "#35C9D6"
    },
    {
        icon: Clock,
        title: "Escolha o melhor horário",
        description: "Veja datas disponíveis em tempo real",
        color: "#50CDCC"
    }
]

function LandingPage() {
    const router = useRouter()

    return (
        <div className={styles.wrapper}>
            {/* ===== HERO SECTION ===== */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>{heroData.title}</h1>
                        <button
                            className={styles.ctaButton}
                            onClick={() => router.push(ROUTES.login)}
                            id="cta-procure-especialista"
                        >
                            {heroData.cta}
                        </button>
                    </div>
                    <div className={styles.heroImageWrapper}>
                        <div className={styles.heroImageGlow}></div>
                        <Image
                            src="/hero_illustration.png"
                            alt="GoDoc - Agende suas consultas"
                            width={520}
                            height={420}
                            className={styles.heroImage}
                            priority
                        />
                    </div>
                </div>
                {/* Decorative wave divider */}
                <div className={styles.waveDivider}>
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120 Z" fill="#ffffff" />
                    </svg>
                </div>
            </section>

            {/* ===== FEATURES SECTION ===== */}
            <section className={styles.featuresSection}>
                <div className={styles.featuresContent}>
                    <div className={styles.featuresTextBlock}>
                        <h2 className={styles.featuresTitle}>{sectionData.title}</h2>
                        <p className={styles.featuresDescription}>{sectionData.description}</p>
                    </div>
                    <div className={styles.featuresCards}>
                        {features.map((item, index) => {
                            const IconComponent = item.icon
                            return (
                                <div
                                    key={index}
                                    className={styles.featureCard}
                                    style={{ '--card-accent': item.color } as React.CSSProperties}
                                    id={`feature-card-${index}`}
                                >
                                    <div className={styles.featureIconWrapper}>
                                        <IconComponent size={24} color="#fff" strokeWidth={2} />
                                    </div>
                                    <div className={styles.featureCardText}>
                                        <h3 className={styles.featureCardTitle}>{item.title}</h3>
                                        <p className={styles.featureCardDesc}>{item.description}</p>
                                    </div>
                                    <div className={styles.featureCardLine}></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage