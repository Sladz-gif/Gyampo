import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { HeartIcon, LightbulbIcon, HandshakeIcon, CalendarIcon, ClockIcon, LocationIcon, StarIcon } from '../components/Icons';
import { blogPosts, events, ventures, getStoredData, storageKeys } from '../utils/sampleData';
import styles from '../styles/Blog.module.css';

const Blog: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'blog' | 'events' | 'ventures'>('blog');
    const [storedBlogPosts, setStoredBlogPosts] = useState(blogPosts);
    const [storedEvents, setStoredEvents] = useState(events);
    const [storedVentures, setStoredVentures] = useState(ventures);
    const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
    const [selectedVenture, setSelectedVenture] = useState<typeof ventures[0] | null>(null);
    const [showPostModal, setShowPostModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showVentureModal, setShowVentureModal] = useState(false);

    const blogRef = useRef<HTMLDivElement>(null);
    const eventsRef = useRef<HTMLDivElement>(null);
    const venturesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load data from localStorage
        const loadedBlogPosts = getStoredData(storageKeys.blogPosts, blogPosts);
        const loadedEvents = getStoredData(storageKeys.events, events);
        const loadedVentures = getStoredData(storageKeys.ventures, ventures);

        setStoredBlogPosts(loadedBlogPosts);
        setStoredEvents(loadedEvents);
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

        const elements = [blogRef.current, eventsRef.current, venturesRef.current].filter(Boolean);
        elements.forEach((el) => observer.observe(el!));

        return () => observer.disconnect();
    }, [activeTab]);

    const handlePostClick = (post: typeof blogPosts[0]) => {
        setSelectedPost(post);
        setShowPostModal(true);
    };

    const handleEventClick = (event: typeof events[0]) => {
        setSelectedEvent(event);
        setShowEventModal(true);
    };

    const handleVentureClick = (venture: typeof ventures[0]) => {
        setSelectedVenture(venture);
        setShowVentureModal(true);
    };

    const BlogCard: React.FC<{ post: typeof blogPosts[0] }> = ({ post }) => (
        <div className={`card ${styles.blogCard}`} onClick={() => handlePostClick(post)}>
            <div className={styles.blogImage}>
                <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderText}>{post.title}</span>
                </div>
            </div>

            <div className={styles.blogContent}>
                <div className={styles.blogMeta}>
                    <span className={styles.blogDate}>{new Date(post.date).toLocaleDateString()}</span>
                    <span className={styles.blogAuthor}>By {post.author}</span>
                </div>

                <h3 className="heading-4">{post.title}</h3>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>

                <div className={styles.blogTags}>
                    {post.tags.map((tag, index) => (
                        <span key={index} className={styles.blogTag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );

    const EventCard: React.FC<{ event: typeof events[0] }> = ({ event }) => (
        <div className={`card ${styles.eventCard}`} onClick={() => handleEventClick(event)}>
            <div className={styles.eventHeader}>
                <div className={styles.eventDate}>
                    <span className={styles.dateDay}>{new Date(event.date).getDate()}</span>
                    <span className={styles.dateMonth}>{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                </div>
                <div className={styles.eventInfo}>
                    <h3 className="heading-4">{event.title}</h3>
                    <p className={styles.eventTime}>{event.time}</p>
                    <p className={styles.eventLocation}>{event.location}</p>
                </div>
                <span className={`${styles.eventType} ${styles[event.type]}`}>
                    {event.type}
                </span>
            </div>

            <div className={styles.eventContent}>
                <p className={styles.eventDescription}>{event.description}</p>
            </div>
        </div>
    );

    const VentureCard: React.FC<{ venture: typeof ventures[0] }> = ({ venture }) => (
        <div className={`card ${styles.ventureCard}`} onClick={() => handleVentureClick(venture)}>
            <div className={styles.ventureHeader}>
                <div className={styles.ventureLogo}>
                    <span className={styles.logoText}>{venture.title.charAt(0)}</span>
                </div>
                <div className={styles.ventureInfo}>
                    <h3 className="heading-4">{venture.title}</h3>
                    <p className={styles.ventureTagline}>{venture.pitch}</p>
                    <span className={`${styles.ventureCategory} ${styles[venture.category]}`}>
                        {venture.category}
                    </span>
                </div>
            </div>

            <div className={styles.ventureContent}>
                <p className={styles.ventureDescription}>{venture.pitch}</p>
                <div className={styles.ventureMeta}>
                    <span className={styles.ventureStage}>{venture.status}</span>
                    <span className={styles.ventureFounder}>By {venture.founder}</span>
                </div>
            </div>
        </div>
    );

    return (
        <Layout
            title="Blog, Events & Ventures — Gyampo, Vice SRC President"
            description="Stay updated with the latest blog posts, events, student ventures, and activities from Gyampo's journey in healthcare innovation and student leadership."
        >
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className="heading-1 text-center">Blog, Events & Ventures</h1>
                        <p className="text-large text-center text-muted">
                            Stay updated with insights, stories, events, and student ventures
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
                                        className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('blog')}
                                    >
                                        Blog Posts
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('events')}
                                    >
                                        Upcoming Events
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`tab-button ${activeTab === 'ventures' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('ventures')}
                                    >
                                        Student Ventures
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Blog Tab */}
                        <div className={`tab-content ${activeTab === 'blog' ? 'active' : ''}`}>
                            <div className={styles.tabHeader}>
                                <h2 className="heading-2">Latest Blog Posts</h2>
                                <p className="text-muted">
                                    Insights, thoughts, and updates on healthcare innovation, student leadership, and technology.
                                </p>
                            </div>

                            <div className={`grid grid-2 ${styles.blogGrid}`} ref={blogRef}>
                                {storedBlogPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>

                        {/* Events Tab */}
                        <div className={`tab-content ${activeTab === 'events' ? 'active' : ''}`}>
                            <div className={styles.tabHeader}>
                                <h2 className="heading-2">Upcoming Events</h2>
                                <p className="text-muted">
                                    Join us for conferences, workshops, meetings, and social events.
                                </p>
                            </div>

                            <div className={`grid grid-2 ${styles.eventsGrid}`} ref={eventsRef}>
                                {storedEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </div>

                        {/* Ventures Tab */}
                        <div className={`tab-content ${activeTab === 'ventures' ? 'active' : ''}`}>
                            <div className={styles.tabHeader}>
                                <h2 className="heading-2">Student Ventures</h2>
                                <p className="text-muted">
                                    Discover innovative projects and startups by University of Ghana students.
                                </p>
                            </div>

                            <div className={`grid grid-2 ${styles.venturesGrid}`} ref={venturesRef}>
                                {storedVentures.map((venture) => (
                                    <VentureCard key={venture.id} venture={venture} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Post Modal */}
            {showPostModal && selectedPost && (
                <div className="modal-overlay" onClick={() => setShowPostModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3 className="heading-3">{selectedPost.title}</h3>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowPostModal(false)}
                                    aria-label="Close modal"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.postMeta}>
                                    <span className={styles.postDate}>{new Date(selectedPost.date).toLocaleDateString()}</span>
                                    <span className={styles.postAuthor}>By {selectedPost.author}</span>
                                </div>

                                <div className={styles.postImage}>
                                    <div className={styles.imagePlaceholder}>
                                        <span className={styles.placeholderText}>{selectedPost.title}</span>
                                    </div>
                                </div>

                                <div className={styles.postContent}>
                                    <p>{selectedPost.content}</p>
                                </div>

                                <div className={styles.postTags}>
                                    {selectedPost.tags.map((tag, index) => (
                                        <span key={index} className={styles.blogTag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Event Detail Modal */}
            {showEventModal && selectedEvent && (
                <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3 className="heading-3">{selectedEvent.title}</h3>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowEventModal(false)}
                                    aria-label="Close modal"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.eventDetails}>
                                    <div className={styles.eventDetailRow}>
                                        <span className={styles.detailLabel}>Date:</span>
                                        <span className={styles.detailValue}>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className={styles.eventDetailRow}>
                                        <span className={styles.detailLabel}>Time:</span>
                                        <span className={styles.detailValue}>{selectedEvent.time}</span>
                                    </div>
                                    <div className={styles.eventDetailRow}>
                                        <span className={styles.detailLabel}>Location:</span>
                                        <span className={styles.detailValue}>{selectedEvent.location}</span>
                                    </div>
                                    <div className={styles.eventDetailRow}>
                                        <span className={styles.detailLabel}>Type:</span>
                                        <span className={`${styles.eventType} ${styles[selectedEvent.type]}`}>
                                            {selectedEvent.type}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.eventDescription}>
                                    <h4>Event Description</h4>
                                    <p>{selectedEvent.description}</p>
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button className="btn btn-primary">
                                    Register for Event
                                </button>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setShowEventModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Venture Modal */}
            {showVentureModal && selectedVenture && (
                <div className="modal-overlay" onClick={() => setShowVentureModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3 className="heading-3">{selectedVenture.title}</h3>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowVentureModal(false)}
                                    aria-label="Close modal"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.ventureDetails}>
                                    <div className={styles.ventureDetailRow}>
                                        <span className={styles.detailLabel}>Pitch:</span>
                                        <span className={styles.detailValue}>{selectedVenture.pitch}</span>
                                    </div>
                                    <div className={styles.ventureDetailRow}>
                                        <span className={styles.detailLabel}>Category:</span>
                                        <span className={`${styles.ventureCategory} ${styles[selectedVenture.category]}`}>
                                            {selectedVenture.category}
                                        </span>
                                    </div>
                                    <div className={styles.ventureDetailRow}>
                                        <span className={styles.detailLabel}>Status:</span>
                                        <span className={styles.detailValue}>{selectedVenture.status}</span>
                                    </div>
                                    <div className={styles.ventureDetailRow}>
                                        <span className={styles.detailLabel}>Founder:</span>
                                        <span className={styles.detailValue}>{selectedVenture.founder}</span>
                                    </div>
                                </div>

                                <div className={styles.ventureDescription}>
                                    <h4>About This Venture</h4>
                                    <p>{selectedVenture.pitch}</p>
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button className="btn btn-primary">
                                    Learn More
                                </button>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setShowVentureModal(false)}
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

export default Blog;

