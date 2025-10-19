import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { opportunities, getStoredData, storageKeys } from '../utils/sampleData';
import styles from '../styles/Opportunities.module.css';

const Opportunities: React.FC = () => {
    const [storedOpportunities, setStoredOpportunities] = useState(opportunities);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedOpportunity, setSelectedOpportunity] = useState<typeof opportunities[0] | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);

    const opportunitiesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load data from localStorage
        const loadedOpportunities = getStoredData(storageKeys.opportunities, opportunities);
        setStoredOpportunities(loadedOpportunities);

        // Load saved opportunities
        const saved = localStorage.getItem('saved_opportunities');
        if (saved) {
            setSavedOpportunities(JSON.parse(saved));
        }
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

        if (opportunitiesRef.current) {
            observer.observe(opportunitiesRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const categories = [
        { id: 'all', label: 'All Opportunities', icon: '🌟' },
        { id: 'internship', label: 'Internships', icon: '💼' },
        { id: 'grant', label: 'Grants', icon: '💰' },
        { id: 'program', label: 'Programs', icon: '📚' },
        { id: 'scholarship', label: 'Scholarships', icon: '🎓' }
    ];

    const filteredOpportunities = selectedCategory === 'all'
        ? storedOpportunities
        : storedOpportunities.filter(opp => opp.type === selectedCategory);

    const handleOpportunityClick = (opportunity: typeof opportunities[0]) => {
        setSelectedOpportunity(opportunity);
        setShowModal(true);
    };

    const handleSaveOpportunity = (opportunityId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSaved = savedOpportunities.includes(opportunityId)
            ? savedOpportunities.filter(id => id !== opportunityId)
            : [...savedOpportunities, opportunityId];

        setSavedOpportunities(newSaved);
        localStorage.setItem('saved_opportunities', JSON.stringify(newSaved));
    };

    const handleShareOpportunity = (opportunity: typeof opportunities[0], e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: opportunity.title,
                text: opportunity.description,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${opportunity.title} - ${opportunity.description}`);
            alert('Opportunity details copied to clipboard!');
        }
    };

    const OpportunityCard: React.FC<{ opportunity: typeof opportunities[0] }> = ({ opportunity }) => (
        <div className={`card ${styles.opportunityCard}`} onClick={() => handleOpportunityClick(opportunity)}>
            <div className={styles.opportunityHeader}>
                <div className={styles.opportunityInfo}>
                    <h3 className="heading-4">{opportunity.title}</h3>
                    <p className={styles.organization}>{opportunity.organization}</p>
                </div>
                <div className={styles.opportunityActions}>
                    <button
                        className={`${styles.saveButton} ${savedOpportunities.includes(opportunity.id) ? styles.saved : ''}`}
                        onClick={(e) => handleSaveOpportunity(opportunity.id, e)}
                        aria-label={savedOpportunities.includes(opportunity.id) ? 'Remove from saved' : 'Save opportunity'}
                    >
                        {savedOpportunities.includes(opportunity.id) ? '❤️' : '🤍'}
                    </button>
                    <button
                        className={styles.shareButton}
                        onClick={(e) => handleShareOpportunity(opportunity, e)}
                        aria-label="Share opportunity"
                    >
                        📤
                    </button>
                </div>
            </div>

            <div className={styles.opportunityContent}>
                <p className={styles.opportunityDescription}>{opportunity.description}</p>

                <div className={styles.opportunityMeta}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Type:</span>
                        <span className={`${styles.typeTag} ${styles[opportunity.type]}`}>
                            {opportunity.type}
                        </span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Deadline:</span>
                        <span className={styles.deadline}>{new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Category:</span>
                        <span className={`${styles.categoryTag} ${styles[opportunity.category]}`}>
                            {opportunity.category}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Layout
            title="Opportunities — Gyampo, Vice SRC President"
            description="Discover internships, grants, programs, and scholarships available to University of Ghana students interested in healthcare innovation and technology."
        >
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className="heading-1 text-center">Opportunities</h1>
                        <p className="text-large text-center text-muted">
                            Discover internships, grants, programs, and scholarships for students
                        </p>
                        <div className={styles.heroStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>{storedOpportunities.length}</span>
                                <span className={styles.statLabel}>Available Opportunities</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>{savedOpportunities.length}</span>
                                <span className={styles.statLabel}>Saved by You</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>4</span>
                                <span className={styles.statLabel}>Categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className={`section ${styles.filterSection}`}>
                <div className="container">
                    <div className={styles.filterContent}>
                        <h2 className="heading-2 text-center mb-4">Filter by Type</h2>
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

            {/* Opportunities Grid */}
            <section className={`section ${styles.opportunitiesSection}`}>
                <div className="container">
                    <div className={styles.opportunitiesContent}>
                        <h2 className="heading-2 text-center mb-5">
                            {selectedCategory === 'all' ? 'All Opportunities' : `${categories.find(c => c.id === selectedCategory)?.label}`}
                        </h2>

                        {filteredOpportunities.length > 0 ? (
                            <div className={`grid grid-2 ${styles.opportunitiesGrid}`} ref={opportunitiesRef}>
                                {filteredOpportunities.map((opportunity) => (
                                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResults}>
                                <div className={styles.noResultsIcon}>🔍</div>
                                <h3 className="heading-3">No opportunities found</h3>
                                <p className="text-muted">
                                    No opportunities match the selected category. Try selecting a different category or check back later for new opportunities.
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
                        <h2 className="heading-2 text-center">Know of an Opportunity?</h2>
                        <p className="text-large text-center text-muted mb-4">
                            Help fellow students by sharing opportunities you come across. Together, we can create a stronger community.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className="btn btn-primary">
                                Share Opportunity
                            </Link>
                            <Link href="/ventures" className="btn btn-secondary">
                                View Student Ventures
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Opportunity Detail Modal */}
            {showModal && selectedOpportunity && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3 className="heading-3">{selectedOpportunity.title}</h3>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close modal"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.opportunityDetails}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Organization:</span>
                                        <span className={styles.detailValue}>{selectedOpportunity.organization}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Type:</span>
                                        <span className={`${styles.typeTag} ${styles[selectedOpportunity.type]}`}>
                                            {selectedOpportunity.type}
                                        </span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Deadline:</span>
                                        <span className={styles.detailValue}>{new Date(selectedOpportunity.deadline).toLocaleDateString()}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Category:</span>
                                        <span className={`${styles.categoryTag} ${styles[selectedOpportunity.category]}`}>
                                            {selectedOpportunity.category}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.opportunityDescription}>
                                    <h4>Description</h4>
                                    <p>{selectedOpportunity.description}</p>
                                </div>

                                <div className={styles.requirements}>
                                    <h4>Requirements</h4>
                                    <ul>
                                        {selectedOpportunity.requirements.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.benefits}>
                                    <h4>Benefits</h4>
                                    <ul>
                                        {selectedOpportunity.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button className="btn btn-primary">
                                    Apply Now
                                </button>
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

export default Opportunities;

