import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/client';
import { useAuth } from '../../../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Login.module.css';
import authSideImage from '../../../assets/auth/login.png';
import logo from '../../../assets/auth/logo.svg';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.post('/auth/login', formData);
            if (response.data && response.data.access_token) {
                login(response.data.access_token);
                navigate('/');
            } else {
                setError('Login failed. No token received.');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <img src={authSideImage} alt="Pixby Branding" className={styles.authSideImage} />
            </div>

            <div className={styles.formSection}>
                <div className={styles.formWrapper}>
                    <div className={styles.formHeaderLogo}>
                        <img src={logo} alt="Pixby Branding" className={styles.authLogoImage} />
                    </div>

                    <h2 className={styles.title}>Log In</h2>
                    {error && <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.passwordInputWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span className={styles.passwordToggleIcon} onClick={togglePasswordVisibility}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
