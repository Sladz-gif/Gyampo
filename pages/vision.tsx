import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Vision.module.css';

const Vision: React.FC = () => {
    const visionRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);

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

        const elements = [visionRef.current, missionRef.current, valuesRef.current].filter(Boolean);
        elements.forEach((el) => observer.observe(el!));

        return () => observer.disconnect();
    }, []);

    const coreValues = [
        {
            title: 'Integrity',
            description: 'We maintain the highest ethical standards in all our endeavors, ensuring transparency, honesty, and accountability in every decision and action.',
            icon: '🛡️',
            color: '#1A4BFF'
        },
        {
            title: 'Innovation',
            description: 'We embrace creative thinking, technological advancement, and forward-looking solutions to address complex healthcare challenges and improve outcomes.',
            icon: '💡',
            color: '#FFD34E'
        },
        {
            title: 'Service',
            description: 'We are dedicated to serving the student community, healthcare professionals, and the broader Ghanaian society with excellence and compassion.',
            icon: '🤝',
            color: '#10B981'
        }
    ];

    return (
        <Layout
            title="Vision & Mission — Gyampo, Vice SRC President"
            description="Explore Gyampo's vision for healthcare innovation, mission to serve students, and core values that guide his leadership and work."
        >
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className="heading-1 text-center">Vision & Mission</h1>
                        <p className="text-large text-center text-muted">
                            Building a Future of Healthcare Innovation and Student Empowerment
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Panels */}
            <section className={`section ${styles.visionMissionSection}`}>
                <div className="container">
                    <div className={styles.panelsContainer}>
                        {/* Vision Panel */}
                        <div className={`${styles.panel} ${styles.visionPanel}`} ref={visionRef}>
                            <div className={styles.panelHeader}>
                                <div className={styles.panelIcon}>
                                    <span>👁️</span>
                                </div>
                                <h2 className="heading-2">Vision</h2>
                            </div>
                            <div className={styles.panelContent}>
                                <p className="text-large">
                                    To create a world where healthcare technology and fintech solutions seamlessly
                                    integrate with traditional practices, making quality healthcare and student
                                    services accessible, efficient, and user-centered for all Ghanaians.
                                </p>
                                <p>
                                    I envision a future where students are empowered to drive innovation,
                                    where technology bridges gaps in healthcare delivery, and where every
                                    individual has access to safe, effective, and personalized healthcare
                                    solutions. This vision extends beyond the university to impact the
                                    entire healthcare ecosystem in Ghana.
                                </p>
                                <div className={styles.visionPoints}>
                                    <div className={styles.visionPoint}>
                                        <span className={styles.pointIcon}>🎯</span>
                                        <span>Universal access to quality healthcare</span>
                                    </div>
                                    <div className={styles.visionPoint}>
                                        <span className={styles.pointIcon}>🔬</span>
                                        <span>Technology-driven healthcare solutions</span>
                                    </div>
                                    <div className={styles.visionPoint}>
                                        <span className={styles.pointIcon}>👥</span>
                                        <span>Empowered student innovators</span>
                                    </div>
                                    <div className={styles.visionPoint}>
                                        <span className={styles.pointIcon}>🌍</span>
                                        <span>Global impact from local innovation</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mission Panel */}
                        <div className={`${styles.panel} ${styles.missionPanel}`} ref={missionRef}>
                            <div className={styles.panelHeader}>
                                <div className={styles.panelIcon}>
                                    <span>🎯</span>
                                </div>
                                <h2 className="heading-2">Mission</h2>
                            </div>
                            <div className={styles.panelContent}>
                                <p className="text-large">
                                    To serve as a catalyst for healthcare and fintech innovation by empowering students,
                                    fostering technological advancement, and creating solutions that improve
                                    healthcare outcomes and student life in Ghana and beyond.
                                </p>
                                <p>
                                    My mission is to bridge the gap between academic knowledge and practical
                                    healthcare solutions, to mentor the next generation of healthcare innovators,
                                    and to create platforms where student ideas can flourish and make real-world
                                    impact. Through leadership, research, and innovation, I aim to transform
                                    healthcare delivery.
                                </p>
                                <div className={styles.missionGoals}>
                                    <div className={styles.missionGoal}>
                                        <h4>Student Empowerment</h4>
                                        <p>Create opportunities for students to develop innovative healthcare solutions</p>
                                    </div>
                                    <div className={styles.missionGoal}>
                                        <h4>Technology Integration</h4>
                                        <p>Develop and implement digital tools that enhance healthcare delivery</p>
                                    </div>
                                    <div className={styles.missionGoal}>
                                        <h4>Community Impact</h4>
                                        <p>Ensure our innovations directly benefit healthcare providers and patients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className={`section ${styles.valuesSection}`}>
                <div className="container">
                    <div className={styles.valuesContent} ref={valuesRef}>
                        <h2 className="heading-2 text-center mb-5">Core Values</h2>
                        <p className="text-large text-center text-muted mb-5">
                            The principles that guide every decision, action, and innovation
                        </p>
                        <div className={`grid grid-3 ${styles.valuesGrid}`}>
                            {coreValues.map((value, index) => (
                                <div key={index} className={`card ${styles.valueCard}`}>
                                    <div className={styles.valueIcon} style={{ color: value.color }}>
                                        {value.icon}
                                    </div>
                                    <h3 className="heading-4">{value.title}</h3>
                                    <p className="text-muted">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className={`section ${styles.impactSection}`}>
                <div className="container">
                    <div className={styles.impactContent}>
                        <h2 className="heading-2 text-center mb-5">Our Impact</h2>
                        <div className={styles.impactGrid}>
                            <div className={styles.impactCard}>
                                <div className={styles.impactNumber}>500+</div>
                                <div className={styles.impactLabel}>Students Engaged</div>
                                <p>Through workshops, mentorship, and innovation programs</p>
                            </div>
                            <div className={styles.impactCard}>
                                <div className={styles.impactNumber}>3</div>
                                <div className={styles.impactLabel}>Major Projects</div>
                                <p>Healthcare technology solutions in development</p>
                            </div>
                            <div className={styles.impactCard}>
                                <div className={styles.impactNumber}>15+</div>
                                <div className={styles.impactLabel}>Partnerships</div>
                                <p>With healthcare institutions and technology companies</p>
                            </div>
                            <div className={styles.impactCard}>
                                <div className={styles.impactNumber}>100%</div>
                                <div className={styles.impactLabel}>Student Focused</div>
                                <p>Every initiative designed to empower and support students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2 className="heading-2 text-center">Join Our Mission</h2>
                        <p className="text-large text-center text-muted mb-4">
                            Be part of the healthcare innovation revolution. Together, we can create
                            solutions that transform healthcare delivery in Ghana and beyond.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/projects" className="btn btn-primary">
                                Explore Projects
                            </Link>
                            <Link href="/opportunities" className="btn btn-accent">
                                Get Involved
                            </Link>
                            <Link href="/contact" className="btn btn-secondary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Vision;

