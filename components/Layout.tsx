import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Gyampo — Vice SRC President, University of Ghana', description = 'Official website of Gyampo, Vice SRC President at University of Ghana. Explore my vision, projects, and initiatives for student leadership and innovation.' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About & Vision' },
        { href: '/projects', label: 'Projects & Research' },
        { href: '/opportunities', label: 'Opportunities' },
        { href: '/blog', label: 'Blog & Events' },
        { href: '/contact', label: 'Contact' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <div className={styles.layout}>
                <header className={styles.header}>
                    <div className="container">
                        <div className={styles.headerContent}>
                            <Link href="/" className={styles.logo}>
                                <span className={styles.logoText}>Gyampo</span>
                                <span className={styles.logoSubtitle}>Vice SRC President</span>
                            </Link>

                            <nav className={styles.nav}>
                                <ul className={styles.navList}>
                                    {navLinks.map((link) => (
                                        <li key={link.href} className={styles.navItem}>
                                            <Link href={link.href} className={styles.navLink}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <button
                                className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                            >
                                <span className={styles.menuLine}></span>
                                <span className={styles.menuLine}></span>
                                <span className={styles.menuLine}></span>
                            </button>
                        </div>
                    </div>
                </header>

                <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
                    <div className={styles.mobileNavContent}>
                        <ul className={styles.mobileNavList}>
                            {navLinks.map((link) => (
                                <li key={link.href} className={styles.mobileNavItem}>
                                    <Link
                                        href={link.href}
                                        className={styles.mobileNavLink}
                                        onClick={closeMenu}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <main className={styles.main}>
                    {children}
                </main>

                <footer className={styles.footer}>
                    <div className="container">
                        <div className={styles.footerContent}>
                            <div className={styles.footerSection}>
                                <h3 className={styles.footerTitle}>Gyampo</h3>
                                <p className={styles.footerDescription}>
                                    Vice SRC President, University of Ghana
                                </p>
                            </div>

                            <div className={styles.footerSection}>
                                <h4 className={styles.footerSubtitle}>Quick Links</h4>
                                <ul className={styles.footerLinks}>
                                    <li><Link href="/about">About & Vision</Link></li>
                                    <li><Link href="/projects">Projects & Research</Link></li>
                                    <li><Link href="/opportunities">Opportunities</Link></li>
                                    <li><Link href="/blog">Blog & Events</Link></li>
                                </ul>
                            </div>

                            <div className={styles.footerSection}>
                                <h4 className={styles.footerSubtitle}>Connect</h4>
                                <ul className={styles.footerLinks}>
                                    <li><Link href="/contact">Contact</Link></li>
                                    <li><a href="mailto:gyampo@ug.edu.gh">Email</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.footerBottom}>
                            <p className={styles.footerCopyright}>
                                © 2024 Gyampo. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Layout;
