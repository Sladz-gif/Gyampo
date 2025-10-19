import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { projects, researchItems, getStoredData, setStoredData, storageKeys } from '../utils/sampleData';
import styles from '../styles/Projects.module.css';

const Projects: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'projects' | 'research'>('projects');
    const [storedProjects, setStoredProjects] = useState(projects);
    const [storedResearch, setStoredResearch] = useState(researchItems);
    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    const projectsRef = useRef<HTMLDivElement>(null);
    const researchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load data from localStorage
        const loadedProjects = getStoredData(storageKeys.projects, projects);
        const loadedResearch = getStoredData(storageKeys.research, researchItems);

        setStoredProjects(loadedProjects);
        setStoredResearch(loadedResearch);
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

        const elements = [projectsRef.current, researchRef.current].filter(Boolean);
        elements.forEach((el) => observer.observe(el!));

        return () => observer.disconnect();
    }, [activeTab]);

    const handlePromoteProject = (projectId: string) => {
        setSelectedProject(projectId);
        setShowPromoteModal(true);
    };

    const confirmPromote = () => {
        if (selectedProject) {
            // Add to ventures (simplified for demo)
            const project = storedProjects.find(p => p.id === selectedProject);
            if (project) {
                // In a real app, this would add to ventures
                alert(`Project "${project.title}" has been promoted to Student Ventures!`);
            }
        }
        setShowPromoteModal(false);
        setSelectedProject(null);
    };

    const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => (
        <div className={`card ${styles.projectCard}`}>
            <div className={styles.projectHeader}>
                <h3 className="heading-4">{project.title}</h3>
                <span className={`${styles.categoryTag} ${styles[project.category]}`}>
                    {project.category}
                </span>
            </div>
            <p className={styles.projectTagline}>{project.tagline}</p>
            <p className={styles.projectDescription}>{project.description}</p>

            <div className={styles.projectDetails}>
                <div className={styles.detailSection}>
                    <h4>Key Features</h4>
                    <ul>
                        {project.features.slice(0, 3).map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.detailSection}>
                    <h4>Ghana Context</h4>
                    <p>{project.ghanaContext.substring(0, 150)}...</p>
                </div>
            </div>

            <div className={styles.projectActions}>
                <button
                    className="btn btn-accent"
                    onClick={() => handlePromoteProject(project.id)}
                >
                    Promote via Student Ventures
                </button>
            </div>
        </div>
    );

    const ResearchCard: React.FC<{ item: typeof researchItems[0] }> = ({ item }) => (
        <div className={`card ${styles.researchCard}`}>
            <div className={styles.researchHeader}>
                <h3 className="heading-4">{item.title}</h3>
                <span className={styles.researchType}>{item.type}</span>
            </div>
            <p className={styles.researchAuthor}>{item.author}</p>
            <p className={styles.researchYear}>{item.year}</p>
            <p className={styles.researchAbstract}>{item.abstract}</p>
        </div>
    );

    return (
        <Layout
            title="Projects & Research — Gyampo, Vice SRC President"
            description="Explore innovative healthcare technology projects and academic research initiatives led by Gyampo and his team."
        >
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className="heading-1 text-center">Projects & Research</h1>
                        <p className="text-large text-center text-muted">
                            Innovative healthcare technology solutions and academic research initiatives
                        </p>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className={`section ${styles.tabsSection}`}>
                <div className="container">
                    <div className={styles.tabsContainer}>
                        <div className="tabs">
                            <ul className="tab-list">
                                <li>
                                    <button
                                        className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('projects')}
                                    >
                                        Projects
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`tab-button ${activeTab === 'research' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('research')}
                                    >
                                        Research
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Projects Tab */}
                        <div className={`tab-content ${activeTab === 'projects' ? 'active' : ''}`}>
                            <div className={styles.tabHeader}>
                                <h2 className="heading-2">Healthcare Technology Projects</h2>
                                <p className="text-muted">
                                    Innovative solutions designed to improve healthcare delivery, medication safety,
                                    and patient outcomes in Ghana and beyond.
                                </p>
                            </div>

                            <div className={`grid grid-2 ${styles.projectsGrid}`} ref={projectsRef}>
                                {storedProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        </div>

                        {/* Research Tab */}
                        <div className={`tab-content ${activeTab === 'research' ? 'active' : ''}`}>
                            <div className={styles.tabHeader}>
                                <h2 className="heading-2">Academic Research</h2>
                                <p className="text-muted">
                                    Scholarly work and research initiatives focused on digital health,
                                    medication safety, and healthcare innovation.
                                </p>
                            </div>

                            <div className={`grid grid-2 ${styles.researchGrid}`} ref={researchRef}>
                                {storedResearch.map((item) => (
                                    <ResearchCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promote Modal */}
            {showPromoteModal && (
                <div className="modal-overlay" onClick={() => setShowPromoteModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <h3 className="heading-3">Promote to Student Ventures</h3>
                            <p>
                                Are you sure you want to promote this project to the Student Ventures platform?
                                This will make it visible to other students and potential supporters.
                            </p>
                            <div className={styles.modalActions}>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setShowPromoteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={confirmPromote}
                                >
                                    Promote Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Projects;


