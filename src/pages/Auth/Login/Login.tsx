import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/client';
import { useAuth } from '../../../hooks/useAuth';
import { Eye, EyeOff, CircleAlert } from 'lucide-react';
import styles from './Login.module.css';
import authSideImage from '../../../assets/auth/login.png';
import logo from '../../../assets/auth/logo.svg';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Clear error when user types
        if (errors[e.target.id as keyof typeof errors]) {
            setErrors({ ...errors, [e.target.id]: '' });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '', general: '' };

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors(prev => ({ ...prev, general: '' }));

        try {
            const response = await apiClient.post('/auth/login', formData);
            if (response.data && response.data.access_token) {
                login(response.data.access_token);
                navigate('/');
            } else {
                setErrors(prev => ({ ...prev, general: 'Login failed. No token received.' }));
            }
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setErrors(prev => ({ ...prev, general: msg }));
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

                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? styles.inputError : ''}
                            />
                            {errors.email && <div className={styles.fieldErrorMessage}>{errors.email}</div>}
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
                                    className={errors.password ? styles.inputError : ''}
                                />
                                <span className={styles.passwordToggleIcon} onClick={togglePasswordVisibility}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                            {errors.password && <div className={styles.fieldErrorMessage}>{errors.password}</div>}
                        </div>

                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
                    </div>

                    {/* Styled Toast Notification */}
                    {errors.general && (
                        <div className={styles.errorToast}>
                            <CircleAlert size={20} color="white" />
                            <span>{errors.general}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
