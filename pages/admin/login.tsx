import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from '../../styles/AdminLogin.module.css';

const AdminLogin: React.FC = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if already logged in
        const isLoggedIn = localStorage.getItem('gyampo_admin_auth');
        if (isLoggedIn) {
            router.push('/admin/dashboard');
        }
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate authentication
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (credentials.username === 'admin' && credentials.password === '12345678') {
                // Store auth token
                localStorage.setItem('gyampo_admin_auth', JSON.stringify({
                    username: credentials.username,
                    loginTime: new Date().toISOString()
                }));

                router.push('/admin/dashboard');
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout
            title="Admin Login — Gyampo, Vice SRC President"
            description="Admin login for managing content and data."
        >
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <h1 className="heading-2">Admin Login</h1>
                        <p className="text-muted">Access the admin dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                                placeholder="Enter username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                                placeholder="Enter password"
                            />
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading"></span>
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className={styles.demoCredentials}>
                        <h4>Demo Credentials:</h4>
                        <p><strong>Username:</strong> admin</p>
                        <p><strong>Password:</strong> 12345678</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminLogin;


