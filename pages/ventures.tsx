import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { ventures, getStoredData, storageKeys } from '../utils/sampleData';
import styles from '../styles/Ventures.module.css';

const Ventures: React.FC = () => {
    const [storedVentures, setStoredVentures] = useState(ventures);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedVenture, setSelectedVenture] = useState<typeof ventures[0] | null>(null);
    const [showModal, setShowModal] = useState(false);

    const venturesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load data from localStorage
        const loadedVentures = getStoredData(storageKeys.ventures, ventures);
        setStoredVentures(loadedVentures);
    }, []);

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

        if (venturesRef.current) {
            observer.observe(venturesRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const categories = [
        { id: 'all', label: 'All Ventures', icon: '🚀' },
        { id: 'tech', label: 'Technology', icon: '💻' },
        { id: 'health', label: 'Healthcare', icon: '🏥' },
        { id: 'social', label: 'Social Impact', icon: '🤝' },
        { id: 'education', label: 'Education', icon: '📚' }
    ];

    const filteredVentures = selectedCategory === 'all'
        ? storedVentures
        : storedVentures.filter(venture => venture.category === selectedCategory);

    const handleVentureClick = (venture: typeof ventures[0]) => {
        setSelectedVenture(venture);
        setShowModal(true);
    };

    const VentureCard: React.FC<{ venture: typeof ventures[0] }> = ({ venture }) => (
        <div className={`card ${styles.ventureCard}`} onClick={() => handleVentureClick(venture)}>
            <div className={styles.ventureImage}>
                <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderText}>{venture.title}</span>
                </div>
                <div className={`${styles.statusBadge} ${styles[venture.status]}`}>
                    {venture.status}
                </div>
            </div>

            <div className={styles.ventureContent}>
                <div className={styles.ventureHeader}>
                    <h3 className="heading-4">{venture.title}</h3>
                    <span className={`${styles.categoryTag} ${styles[venture.category]}`}>
                        {venture.category}
                    </span>
                </div>

                <p className={styles.venturePitch}>{venture.pitch}</p>

                <div className={styles.ventureMeta}>
                    <div className={styles.founder}>
                        <span className={styles.metaLabel}>Founder:</span>
                        <span className={styles.metaValue}>{venture.founder}</span>
                    </div>
                </div>

                <div className={styles.ventureActions}>
                    <button className="btn btn-primary">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <Layout
            title="Student Ventures — Gyampo, Vice SRC President"
            description="Discover and support innovative student-led projects, startups, and entrepreneurial initiatives at University of Ghana."
        >
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className="heading-1 text-center">Student Ventures</h1>
                        <p className="text-large text-center text-muted">
                            Supporting student innovation and entrepreneurship at University of Ghana
                        </p>
                        <div className={styles.heroStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>{storedVentures.length}</span>
                                <span className={styles.statLabel}>Active Ventures</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>4</span>
                                <span className={styles.statLabel}>Categories</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>100%</span>
                                <span className={styles.statLabel}>Student Led</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className={`section ${styles.filterSection}`}>
                <div className="container">
                    <div className={styles.filterContent}>
                        <h2 className="heading-2 text-center mb-4">Explore by Category</h2>
                        <div className={styles.categoryFilters}>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`${styles.categoryFilter} ${selectedCategory === category.id ? styles.active : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <span className={styles.filterIcon}>{category.icon}</span>
                                    <span className={styles.filterLabel}>{category.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Ventures Grid */}
            <section className={`section ${styles.venturesSection}`}>
                <div className="container">
                    <div className={styles.venturesContent}>
                        <h2 className="heading-2 text-center mb-5">
                            {selectedCategory === 'all' ? 'All Student Ventures' : `${categories.find(c => c.id === selectedCategory)?.label}`}
                        </h2>

                        {filteredVentures.length > 0 ? (
                            <div className={`grid grid-3 ${styles.venturesGrid}`} ref={venturesRef}>
                                {filteredVentures.map((venture) => (
                                    <VentureCard key={venture.id} venture={venture} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResults}>
                                <div className={styles.noResultsIcon}>🔍</div>
                                <h3 className="heading-3">No ventures found</h3>
                                <p className="text-muted">
                                    No ventures match the selected category. Try selecting a different category or check back later for new ventures.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2 className="heading-2 text-center">Have a Venture to Share?</h2>
                        <p className="text-large text-center text-muted mb-4">
                            Are you working on an innovative project or startup? We&apos;d love to feature it on our platform.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className="btn btn-primary">
                                Submit Your Venture
                            </Link>
                            <Link href="/projects" className="btn btn-secondary">
                                View Our Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Venture Detail Modal */}
            {showModal && selectedVenture && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3 className="heading-3">{selectedVenture.title}</h3>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close modal"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.modalImage}>
                                    <div className={styles.imagePlaceholder}>
                                        <span className={styles.placeholderText}>{selectedVenture.title}</span>
                                    </div>
                                </div>

                                <div className={styles.modalDetails}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Founder:</span>
                                        <span className={styles.detailValue}>{selectedVenture.founder}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Contact:</span>
                                        <span className={styles.detailValue}>{selectedVenture.contact}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Category:</span>
                                        <span className={`${styles.categoryTag} ${styles[selectedVenture.category]}`}>
                                            {selectedVenture.category}
                                        </span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Status:</span>
                                        <span className={`${styles.statusBadge} ${styles[selectedVenture.status]}`}>
                                            {selectedVenture.status}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.modalPitch}>
                                    <h4>Project Pitch</h4>
                                    <p>{selectedVenture.pitch}</p>
                                </div>

                                <div className={styles.modalSupport}>
                                    <h4>How to Support</h4>
                                    <ul>
                                        {selectedVenture.supportWays.map((way, index) => (
                                            <li key={index}>{way}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <a
                                    href={`mailto:${selectedVenture.contact}`}
                                    className="btn btn-primary"
                                >
                                    Contact Founder
                                </a>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Ventures;

