import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {
    projects, researchItems, blogPosts, events, opportunities, ventures,
    getStoredData, setStoredData, storageKeys, initializeData
} from '../../utils/sampleData';
import styles from '../../styles/AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [data, setData] = useState({
        projects: projects,
        research: researchItems,
        blogPosts: blogPosts,
        events: events,
        opportunities: opportunities,
        ventures: ventures
    });
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const auth = localStorage.getItem('gyampo_admin_auth');
        if (!auth) {
            router.push('/admin/login');
            return;
        }

        setIsAuthenticated(true);
        initializeData();

        // Load current data
        const loadedData = {
            projects: getStoredData(storageKeys.projects, projects),
            research: getStoredData(storageKeys.research, researchItems),
            blogPosts: getStoredData(storageKeys.blogPosts, blogPosts),
            events: getStoredData(storageKeys.events, events),
            opportunities: getStoredData(storageKeys.opportunities, opportunities),
            ventures: getStoredData(storageKeys.ventures, ventures)
        };

        setData(loadedData);
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('gyampo_admin_auth');
        router.push('/admin/login');
    };

    const handleResetData = () => {
        if (confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
            setStoredData(storageKeys.projects, projects);
            setStoredData(storageKeys.research, researchItems);
            setStoredData(storageKeys.blogPosts, blogPosts);
            setStoredData(storageKeys.events, events);
            setStoredData(storageKeys.opportunities, opportunities);
            setStoredData(storageKeys.ventures, ventures);

            // Reload data
            const loadedData = {
                projects: getStoredData(storageKeys.projects, projects),
                research: getStoredData(storageKeys.research, researchItems),
                blogPosts: getStoredData(storageKeys.blogPosts, blogPosts),
                events: getStoredData(storageKeys.events, events),
                opportunities: getStoredData(storageKeys.opportunities, opportunities),
                ventures: getStoredData(storageKeys.ventures, ventures)
            };

            setData(loadedData);
            alert('Data has been reset to default values.');
        }
    };

    const handleExportData = () => {
        const exportData = {
            projects: data.projects,
            research: data.research,
            blogPosts: data.blogPosts,
            events: data.events,
            opportunities: data.opportunities,
            ventures: data.ventures,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gyampo-data-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return (
            <Layout title="Admin Dashboard — Loading...">
                <div className={styles.loadingContainer}>
                    <div className="loading"></div>
                    <p>Loading admin dashboard...</p>
                </div>
            </Layout>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'projects', label: 'Projects & Research', icon: '🔬' },
        { id: 'blog', label: 'Blog & Events', icon: '📝' },
        { id: 'opportunities', label: 'Opportunities', icon: '💼' },
        { id: 'ventures', label: 'Student Ventures', icon: '🚀' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    return (
        <Layout title="Admin Dashboard — Gyampo, Vice SRC President">
            <div className={styles.adminContainer}>
                <div className={styles.adminSidebar}>
                    <div className={styles.sidebarHeader}>
                        <h3>Admin Panel</h3>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Logout
                        </button>
                    </div>

                    <nav className={styles.sidebarNav}>
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                className={`${styles.sidebarItem} ${activeTab === item.id ? styles.active : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span className={styles.sidebarIcon}>{item.icon}</span>
                                <span className={styles.sidebarLabel}>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className={styles.adminContent}>
                    {activeTab === 'dashboard' && (
                        <div className={styles.dashboardTab}>
                            <h1 className="heading-1">Admin Dashboard</h1>
                            <p className="text-muted mb-5">Manage content and data for the Gyampo website.</p>

                            <div className={styles.statsGrid}>
                                <div className={`card ${styles.statCard}`}>
                                    <div className={styles.statIcon}>🔬</div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statNumber}>{data.projects.length}</div>
                                        <div className={styles.statLabel}>Projects</div>
                                    </div>
                                </div>

                                <div className={`card ${styles.statCard}`}>
                                    <div className={styles.statIcon}>📝</div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statNumber}>{data.blogPosts.length}</div>
                                        <div className={styles.statLabel}>Blog Posts</div>
                                    </div>
                                </div>

                                <div className={`card ${styles.statCard}`}>
                                    <div className={styles.statIcon}>📅</div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statNumber}>{data.events.length}</div>
                                        <div className={styles.statLabel}>Events</div>
                                    </div>
                                </div>

                                <div className={`card ${styles.statCard}`}>
                                    <div className={styles.statIcon}>💼</div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statNumber}>{data.opportunities.length}</div>
                                        <div className={styles.statLabel}>Opportunities</div>
                                    </div>
                                </div>

                                <div className={`card ${styles.statCard}`}>
                                    <div className={styles.statIcon}>🚀</div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statNumber}>{data.ventures.length}</div>
                                        <div className={styles.statLabel}>Ventures</div>
                                    </div>
                                </div>

                                <div className={`card ${styles.statCard}`}>
                                    <div className={styles.statIcon}>📚</div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statNumber}>{data.research.length}</div>
                                        <div className={styles.statLabel}>Research Items</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.quickActions}>
                                <h2 className="heading-2">Quick Actions</h2>
                                <div className={styles.actionButtons}>
                                    <button onClick={handleExportData} className="btn btn-primary">
                                        Export Data
                                    </button>
                                    <button onClick={handleResetData} className="btn btn-secondary">
                                        Reset to Default
                                    </button>
                                    <Link href="/" className="btn btn-outline">
                                        View Website
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className={styles.contentTab}>
                            <h1 className="heading-1">Projects & Research</h1>
                            <p className="text-muted mb-5">Manage healthcare technology projects and research items.</p>

                            <div className={styles.contentGrid}>
                                <div className={styles.contentSection}>
                                    <h3 className="heading-3">Projects ({data.projects.length})</h3>
                                    <div className={styles.contentList}>
                                        {data.projects.map((project) => (
                                            <div key={project.id} className={styles.contentItem}>
                                                <h4>{project.title}</h4>
                                                <p>{project.tagline}</p>
                                                <span className={styles.contentCategory}>{project.category}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.contentSection}>
                                    <h3 className="heading-3">Research Items ({data.research.length})</h3>
                                    <div className={styles.contentList}>
                                        {data.research.map((item) => (
                                            <div key={item.id} className={styles.contentItem}>
                                                <h4>{item.title}</h4>
                                                <p>{item.author} - {item.year}</p>
                                                <span className={styles.contentCategory}>{item.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'blog' && (
                        <div className={styles.contentTab}>
                            <h1 className="heading-1">Blog & Events</h1>
                            <p className="text-muted mb-5">Manage blog posts and events.</p>

                            <div className={styles.contentGrid}>
                                <div className={styles.contentSection}>
                                    <h3 className="heading-3">Blog Posts ({data.blogPosts.length})</h3>
                                    <div className={styles.contentList}>
                                        {data.blogPosts.map((post) => (
                                            <div key={post.id} className={styles.contentItem}>
                                                <h4>{post.title}</h4>
                                                <p>{post.excerpt}</p>
                                                <span className={styles.contentCategory}>{post.author}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.contentSection}>
                                    <h3 className="heading-3">Events ({data.events.length})</h3>
                                    <div className={styles.contentList}>
                                        {data.events.map((event) => (
                                            <div key={event.id} className={styles.contentItem}>
                                                <h4>{event.title}</h4>
                                                <p>{event.date} - {event.location}</p>
                                                <span className={styles.contentCategory}>{event.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'opportunities' && (
                        <div className={styles.contentTab}>
                            <h1 className="heading-1">Opportunities</h1>
                            <p className="text-muted mb-5">Manage internships, grants, and programs.</p>

                            <div className={styles.contentList}>
                                {data.opportunities.map((opportunity) => (
                                    <div key={opportunity.id} className={styles.contentItem}>
                                        <h4>{opportunity.title}</h4>
                                        <p>{opportunity.organization} - Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</p>
                                        <span className={styles.contentCategory}>{opportunity.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'ventures' && (
                        <div className={styles.contentTab}>
                            <h1 className="heading-1">Student Ventures</h1>
                            <p className="text-muted mb-5">Manage student-led projects and startups.</p>

                            <div className={styles.contentList}>
                                {data.ventures.map((venture) => (
                                    <div key={venture.id} className={styles.contentItem}>
                                        <h4>{venture.title}</h4>
                                        <p>{venture.founder} - {venture.contact}</p>
                                        <span className={styles.contentCategory}>{venture.category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className={styles.settingsTab}>
                            <h1 className="heading-1">Settings</h1>
                            <p className="text-muted mb-5">Manage system settings and data.</p>

                            <div className={styles.settingsGrid}>
                                <div className={`card ${styles.settingCard}`}>
                                    <h3 className="heading-3">Data Management</h3>
                                    <p>Export or reset all website data.</p>
                                    <div className={styles.settingActions}>
                                        <button onClick={handleExportData} className="btn btn-primary">
                                            Export Data
                                        </button>
                                        <button onClick={handleResetData} className="btn btn-secondary">
                                            Reset Data
                                        </button>
                                    </div>
                                </div>

                                <div className={`card ${styles.settingCard}`}>
                                    <h3 className="heading-3">System Info</h3>
                                    <div className={styles.systemInfo}>
                                        <p><strong>Version:</strong> 1.0.0</p>
                                        <p><strong>Framework:</strong> Next.js</p>
                                        <p><strong>Storage:</strong> localStorage</p>
                                        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;


