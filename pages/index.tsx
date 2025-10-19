import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CreditCardIcon, MapIcon, StoreIcon } from '../components/Icons';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const elements = [heroRef.current, cardsRef.current, quoteRef.current].filter(Boolean);
        elements.forEach((el) => observer.observe(el!));

        return () => observer.disconnect();
    }, []);

    const highlightCards = [
        {
            title: 'Projects & Research',
            description: 'Explore innovative healthcare technology projects and academic research initiatives.',
            href: '/projects',
            icon: '🔬'
        },
        {
            title: 'Opportunities',
            description: 'Discover internships, grants, and programs for students interested in healthcare innovation.',
            href: '/opportunities',
            icon: '💼'
        },
        {
            title: 'Student Ventures',
            description: 'Support and promote student-led projects, startups, and entrepreneurial initiatives.',
            href: '/ventures',
            icon: '🚀'
        }
    ];

    return (
        <Layout
            title="Gyampo — Vice SRC President, University of Ghana"
            description="Official website of Gyampo, Vice SRC President at University of Ghana. Explore vision, projects, research, and opportunities in healthcare innovation."
        >
            {/* Hero Section */}
            <section className={styles.hero} ref={heroRef}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <h1 className={`heading-1 ${styles.heroTitle}`}>
                                Leading Innovation in Healthcare Technology & Fintech
                            </h1>
                            <p className={`text-large ${styles.heroSubtitle}`}>
                                As Vice SRC President at University of Ghana, I&apos;m committed to advancing
                                healthcare through technology, developing campus payment solutions like Azaman,
                                and empowering students through research and innovation.
                            </p>
                            <div className={styles.heroButtons}>
                                <Link href="/vision" className="btn btn-primary">
                                    Explore Vision
                                </Link>
                                <Link href="/projects" className="btn btn-secondary">
                                    View Projects & Research
                                </Link>
                            </div>
                        </div>
                        <div className={styles.heroImage}>
                            <div className={styles.imagePlaceholder}>
                                <span className={styles.placeholderText}>Gyampo - Vice SRC President</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bio Preview Section */}
            <section className={`section ${styles.bioSection}`}>
                <div className="container">
                    <div className={styles.bioContent}>
                        <div className={styles.bioText}>
                            <h2 className="heading-2">About Gyampo</h2>
                            <p className="text-large">
                                I am a passionate pharmacy student and Vice SRC President at the University of Ghana,
                                dedicated to bridging the gap between healthcare and technology. My vision is to
                                create innovative solutions that improve healthcare delivery and student life in Ghana and beyond.
                            </p>
                            <p>
                                Through my leadership role, I work to empower students, foster innovation, and
                                create opportunities for meaningful impact in healthcare, fintech, and technology sectors.
                                I&apos;m currently developing Azaman, a campus payment and navigation platform for Ghanaian students.
                            </p>
                            <Link href="/about" className="btn btn-outline">
                                Learn More About Me
                            </Link>
                        </div>
                        <div className={styles.bioImage}>
                            <div className={styles.bioImagePlaceholder}>
                                <span>Gyampo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlight Cards Section */}
            <section className={`section ${styles.highlightsSection}`} ref={cardsRef}>
                <div className="container">
                    <h2 className="heading-2 text-center mb-5">Explore My Work</h2>
                    <div className={`grid grid-3 ${styles.highlightCards}`}>
                        {highlightCards.map((card, index) => (
                            <Link key={card.href} href={card.href} className={`card ${styles.highlightCard}`}>
                                <div className={styles.cardIcon}>{card.icon}</div>
                                <h3 className="heading-4">{card.title}</h3>
                                <p className="text-muted">{card.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Azaman Section */}
            <section className={styles.azamanSection} ref={quoteRef}>
                <div className="container">
                    <div className={styles.azamanContent}>
                        <div className={styles.azamanText}>
                            <h2 className="heading-2">Featured Project: Azaman</h2>
                            <p className="text-large">
                                A campus-focused payment and navigation platform designed for university students in Ghana.
                                Send Am - the future of campus life.
                            </p>
                            <div className={styles.azamanFeatures}>
                                <div className={styles.azamanFeature}>
                                    <CreditCardIcon className={styles.featureIcon} />
                                    <span>Sendam Payment System</span>
                                </div>
                                <div className={styles.azamanFeature}>
                                    <MapIcon className={styles.featureIcon} />
                                    <span>Interactive Campus Map</span>
                                </div>
                                <div className={styles.azamanFeature}>
                                    <StoreIcon className={styles.featureIcon} />
                                    <span>Business Directory</span>
                                </div>
                            </div>
                            <Link href="/azaman" className="btn btn-primary">
                                Explore Azaman
                            </Link>
                        </div>
                        <div className={styles.azamanVisual}>
                            <div className={styles.azamanCard}>
                                <div className={styles.azamanLogo}>
                                    <span className={styles.logoText}>Azaman</span>
                                    <span className={styles.logoTagline}>Send Am</span>
                                </div>
                                <div className={styles.azamanPreview}>
                                    <div className={styles.previewItem}>
                                        <CreditCardIcon className={styles.previewIcon} />
                                        <span>Quick Payments</span>
                                    </div>
                                    <div className={styles.previewItem}>
                                        <MapIcon className={styles.previewIcon} />
                                        <span>Campus Navigation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className={styles.quoteSection}>
                <div className="container">
                    <div className={styles.quoteContent}>
                        <blockquote className={styles.quote}>
                            &ldquo;Innovation in healthcare isn&apos;t just about technology&mdash;it&apos;s about creating
                            solutions that truly serve our communities and improve lives.&rdquo;
                        </blockquote>
                        <cite className={styles.quoteAuthor}>— Gyampo, Vice SRC President</cite>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className={`section ${styles.ctaSection}`}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2 className="heading-2 text-center">Ready to Make an Impact?</h2>
                        <p className="text-large text-center text-muted mb-4">
                            Join me in advancing healthcare innovation and student leadership at University of Ghana.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className="btn btn-primary">
                                Get in Touch
                            </Link>
                            <Link href="/opportunities" className="btn btn-accent">
                                Explore Opportunities
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;

