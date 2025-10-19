import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { EyeIcon, TargetIcon, MicroscopeIcon, UsersIcon, GlobeIcon } from '../components/Icons';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
    const photoRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);
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

        const elements = [photoRef.current, bioRef.current, journeyRef.current, valuesRef.current].filter(Boolean);
        elements.forEach((el) => observer.observe(el!));

        return () => observer.disconnect();
    }, []);

    const values = [
        {
            title: 'Integrity',
            description: 'Maintaining the highest ethical standards in all endeavors, ensuring transparency and accountability in leadership.',
            icon: '🛡️'
        },
        {
            title: 'Innovation',
            description: 'Embracing creative thinking and technological advancement to solve complex healthcare challenges.',
            icon: '💡'
        },
        {
            title: 'Service',
            description: 'Dedicated to serving the student community and advancing healthcare outcomes for all Ghanaians.',
            icon: '🤝'
        }
    ];

    return (
        <Layout
            title="About & Vision — Gyampo, Vice SRC President, University of Ghana"
            description="Learn about Gyampo's journey as a pharmacy student and Vice SRC President, his academic achievements, vision for healthcare innovation, and mission to serve students."
        >
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className="heading-1 text-center">About Gyampo</h1>
                        <p className="text-large text-center text-muted">
                            Pharmacy Student, Healthcare Innovator, and Student Leader
                        </p>
                    </div>
                </div>
            </section>

            {/* Photo & Bio Section */}
            <section className={`section ${styles.photoBioSection}`}>
                <div className="container">
                    <div className={styles.photoBioContent}>
                        <div className={styles.photoSection} ref={photoRef}>
                            <div className={styles.photoPlaceholder}>
                                <span className={styles.photoText}>Gyampo</span>
                                <span className={styles.photoSubtext}>Vice SRC President</span>
                            </div>
                        </div>
                        <div className={styles.bioSection} ref={bioRef}>
                            <h2 className="heading-2">Biography</h2>
                            <p className="text-large">
                                I am Gyampo, a dedicated pharmacy student at the University of Ghana and currently
                                serving as the Vice President of the Students&apos; Representative Council (SRC). My
                                journey in healthcare and leadership has been driven by a passion for innovation
                                and a commitment to improving healthcare outcomes and student life in Ghana.
                            </p>
                            <p>
                                As a pharmacy student, I have developed a deep understanding of the challenges
                                facing healthcare delivery in our country. This knowledge, combined with my
                                interest in technology, has led me to explore innovative solutions that can
                                bridge the gap between traditional healthcare practices and modern technological
                                advancements.
                            </p>
                            <p>
                                My role as Vice SRC President has given me the opportunity to represent student
                                interests, advocate for positive change, and create platforms for student
                                innovation and entrepreneurship. I believe that students have the power to
                                drive meaningful change in our society.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academic Journey Section */}
            <section className={`section ${styles.journeySection}`}>
                <div className="container">
                    <div className={styles.journeyContent} ref={journeyRef}>
                        <h2 className="heading-2 text-center mb-5">Academic Journey</h2>
                        <div className={styles.journeyTimeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>
                                    <span>🎓</span>
                                </div>
                                <div className={styles.timelineContent}>
                                    <h3 className="heading-4">Pharmacy Student</h3>
                                    <p className="text-muted">University of Ghana</p>
                                    <p>
                                        Currently pursuing a degree in Pharmacy, focusing on clinical pharmacy,
                                        drug interactions, and healthcare technology applications. My studies
                                        have provided me with a solid foundation in pharmaceutical sciences
                                        and patient care.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>
                                    <span>🔬</span>
                                </div>
                                <div className={styles.timelineContent}>
                                    <h3 className="heading-4">Research Focus</h3>
                                    <p className="text-muted">Digital Health & Medication Safety</p>
                                    <p>
                                        My research interests center around digital health solutions, medication
                                        safety, and the integration of technology in pharmacy practice. I am
                                        particularly interested in developing tools that can help prevent
                                        medication errors and improve patient outcomes.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>
                                    <span>💻</span>
                                </div>
                                <div className={styles.timelineContent}>
                                    <h3 className="heading-4">Technology Integration</h3>
                                    <p className="text-muted">Healthcare Innovation</p>
                                    <p>
                                        I am passionate about leveraging technology to solve healthcare challenges and
                                        improve student life. This includes developing digital tools for medication management,
                                        telepharmacy solutions, clinical decision support systems, and innovative fintech
                                        solutions like Azaman that can improve healthcare delivery and campus life in Ghana.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Story Section */}
            <section className={`section ${styles.leadershipSection}`}>
                <div className="container">
                    <div className={styles.leadershipContent}>
                        <h2 className="heading-2 text-center mb-5">Leadership Story</h2>
                        <div className={styles.leadershipGrid}>
                            <div className={styles.leadershipCard}>
                                <h3 className="heading-4">Vice SRC President</h3>
                                <p>
                                    As Vice President of the Students&apos; Representative Council, I work closely
                                    with the student body to address their concerns, advocate for their rights,
                                    and create opportunities for student development and engagement.
                                </p>
                                <ul className={styles.leadershipList}>
                                    <li>Student advocacy and representation</li>
                                    <li>Policy development and implementation</li>
                                    <li>Event planning and student engagement</li>
                                    <li>Collaboration with university administration</li>
                                </ul>
                            </div>

                            <div className={styles.leadershipCard}>
                                <h3 className="heading-4">Vision for Change</h3>
                                <p>
                                    My leadership is driven by a vision of creating a more innovative,
                                    inclusive, and technologically advanced university environment that
                                    prepares students for the challenges of the 21st century.
                                </p>
                                <ul className={styles.leadershipList}>
                                    <li>Promoting digital literacy and innovation</li>
                                    <li>Supporting student entrepreneurship</li>
                                    <li>Enhancing healthcare education and research</li>
                                    <li>Building partnerships with industry leaders</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={`section ${styles.valuesSection}`}>
                <div className="container">
                    <div className={styles.valuesContent} ref={valuesRef}>
                        <h2 className="heading-2 text-center mb-5">Core Values</h2>
                        <div className={`grid grid-3 ${styles.valuesGrid}`}>
                            {values.map((value, index) => (
                                <div key={index} className={`card ${styles.valueCard}`}>
                                    <div className={styles.valueIcon}>{value.icon}</div>
                                    <h3 className="heading-4">{value.title}</h3>
                                    <p className="text-muted">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className={styles.visionMissionSection}>
                <div className="container">
                    <h2 className="heading-2 text-center mb-5">Vision & Mission</h2>
                    <div className={styles.visionMissionGrid}>
                        {/* Vision */}
                        <div className={styles.visionCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <EyeIcon />
                                </div>
                                <h3 className="heading-3">Vision</h3>
                            </div>
                            <div className={styles.cardContent}>
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
                                        <TargetIcon className={styles.pointIcon} />
                                        <span>Universal access to quality healthcare</span>
                                    </div>
                                    <div className={styles.visionPoint}>
                                        <MicroscopeIcon className={styles.pointIcon} />
                                        <span>Technology-driven healthcare solutions</span>
                                    </div>
                                    <div className={styles.visionPoint}>
                                        <UsersIcon className={styles.pointIcon} />
                                        <span>Empowered student innovators</span>
                                    </div>
                                    <div className={styles.visionPoint}>
                                        <GlobeIcon className={styles.pointIcon} />
                                        <span>Global impact from local innovation</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className={styles.missionCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <TargetIcon />
                                </div>
                                <h3 className="heading-3">Mission</h3>
                            </div>
                            <div className={styles.cardContent}>
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

            {/* Quote Section */}
            <section className={styles.quoteSection}>
                <div className="container">
                    <div className={styles.quoteContent}>
                        <blockquote className={styles.quote}>
                            &ldquo;Leadership is not about being in charge. It&apos;s about taking care of those in your charge
                            and creating opportunities for them to succeed and make a positive impact.&rdquo;
                        </blockquote>
                        <cite className={styles.quoteAuthor}>— Gyampo, Vice SRC President</cite>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;

