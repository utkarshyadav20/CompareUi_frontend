import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/client';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Signup.module.css';
import authSideImage from '../../../assets/auth/login.png';
import logo from '../../../assets/auth/logo.svg';

export const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        general: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (errors[e.target.id as keyof typeof errors]) {
            setErrors({ ...errors, [e.target.id]: '' });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { username: '', email: '', password: '', general: '' };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            valid = false;
        }

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
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
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
            await apiClient.post('/auth/signup', formData);
            // Navigate to OTP page with email
            navigate('/otp', { state: { email: formData.email } });
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || 'Signup failed. Please try again.';
            if (msg.toLowerCase().includes('email')) {
                setErrors(prev => ({ ...prev, email: msg }));
            } else {
                setErrors(prev => ({ ...prev, general: msg }));
            }
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

                    <h2 className={styles.title}>Sign Up</h2>
                    {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}
                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? styles.inputError : ''}
                            />
                            {errors.username && <div className={styles.fieldErrorMessage}>{errors.username}</div>}
                        </div>

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
                            <label htmlFor="password">Create password</label>
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
                            {isLoading ? 'Creating Account...' : 'Verify Email'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Already have an account? <Link to="/login" className={styles.link}>Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
