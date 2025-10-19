import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { HeartIcon, LightbulbIcon, HandshakeIcon, PhoneIcon, EmailIcon, LinkedinIcon, TwitterIcon, GithubIcon } from '../components/Icons';
import styles from '../styles/Contact.module.css';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const contactRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store in localStorage for demo purposes
            const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
            submissions.push({
                ...formData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contact_submissions', JSON.stringify(submissions));

            setToastMessage('Thank you for your message! I\'ll get back to you soon.');
            setToastType('success');
            setShowToast(true);

            // Reset form
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setToastMessage('Sorry, there was an error sending your message. Please try again.');
            setToastType('error');
            setShowToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            value: 'gyampo@st.ug.edu.gh',
            link: 'mailto:gyampo@st.ug.edu.gh'
        },
        {
            icon: '📱',
            title: 'Phone',
            value: '+233 XX XXX XXXX',
            link: 'tel:+233XXXXXXXXX'
        },
        {
            icon: '🏢',
            title: 'Office',
            value: 'SRC Building, University of Ghana',
            link: null
        },
        {
            icon: '📍',
            title: 'Location',
            value: 'Legon, Accra, Ghana',
            link: null
        }
    ];

    const socialLinks = [
        { name: 'LinkedIn', icon: '💼', url: '#' },
        { name: 'Twitter', icon: '🐦', url: '#' },
        { name: 'Instagram', icon: '📷', url: '#' }
    ];

    return (
        <Layout
            title="Contact — Gyampo, Vice SRC President"
            description="Get in touch with Gyampo, Vice SRC President at University of Ghana. Send a message or find contact information."
        >
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className="heading-1 text-center">Contact Me</h1>
                        <p className="text-large text-center text-muted">
                            Get in touch for collaborations, questions, or just to say hello
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={`section ${styles.contactSection}`}>
                <div className="container">
                    <div className={styles.contactContent} ref={contactRef}>
                        <div className={styles.contactGrid}>
                            {/* Contact Form */}
                            <div className={styles.contactForm}>
                                <h2 className="heading-2 mb-4">Send a Message</h2>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="form-textarea"
                                            required
                                            placeholder="Tell me what's on your mind..."
                                            rows={6}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className={styles.contactInfo}>
                                <h2 className="heading-2 mb-4">Get in Touch</h2>
                                <p className="text-muted mb-5">
                                    I&apos;m always interested in hearing from students, collaborators, and anyone
                                    passionate about healthcare innovation. Feel free to reach out!
                                </p>

                                <div className={styles.contactDetails}>
                                    {contactInfo.map((info, index) => (
                                        <div key={index} className={styles.contactItem}>
                                            <div className={styles.contactIcon}>{info.icon}</div>
                                            <div className={styles.contactText}>
                                                <h4 className={styles.contactTitle}>{info.title}</h4>
                                                {info.link ? (
                                                    <a href={info.link} className={styles.contactValue}>
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <span className={styles.contactValue}>{info.value}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.socialSection}>
                                    <h4 className={styles.socialTitle}>Follow Me</h4>
                                    <div className={styles.socialLinks}>
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                className={styles.socialLink}
                                                aria-label={social.name}
                                            >
                                                <span className={styles.socialIcon}>{social.icon}</span>
                                                <span className={styles.socialName}>{social.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Info Section */}
            <section className={`section ${styles.infoSection}`}>
                <div className="container">
                    <div className={styles.infoContent}>
                        <h2 className="heading-2 text-center mb-5">What to Expect</h2>
                        <div className={styles.infoGrid}>
                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}>⚡</div>
                                <h3 className="heading-4">Quick Response</h3>
                                <p>
                                    I typically respond to messages within 24-48 hours. For urgent matters,
                                    feel free to call or visit my office.
                                </p>
                            </div>

                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}>
                                    <HandshakeIcon />
                                </div>
                                <h3 className="heading-4">Collaboration Welcome</h3>
                                <p>
                                    I&apos;m always open to discussing new ideas, partnerships, and opportunities
                                    for collaboration in healthcare innovation.
                                </p>
                            </div>

                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}>
                                    <LightbulbIcon />
                                </div>
                                <h3 className="heading-4">Student Support</h3>
                                <p>
                                    As Vice SRC President, I&apos;m here to support students with their concerns,
                                    ideas, and initiatives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toast Notification */}
            {showToast && (
                <div className={`toast ${toastType} ${showToast ? 'show' : ''}`}>
                    <p>{toastMessage}</p>
                    <button
                        className={styles.toastClose}
                        onClick={() => setShowToast(false)}
                        aria-label="Close notification"
                    >
                        ×
                    </button>
                </div>
            )}
        </Layout>
    );
};

export default Contact;

