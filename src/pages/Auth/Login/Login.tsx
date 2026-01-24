import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';
import authSideImage from '../../../assets/auth/login.png';
import logo from '../../../assets/auth/logo.svg';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-banner">
                <img src={authSideImage} alt="Pixby Branding" className="auth-side-image" />
            </div>

            <div className="login-form-section">
                <div className="form-wrapper">
                    <div className="form-header-logo">
                        <img src={logo} alt="Pixby Branding" className="auth-logo-image" />
                    </div>

                    <h2 className="login-title">Log In</h2>

                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email or Username</label>
                            <input type="text" id="email" placeholder="Enter your email or username" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="login-button">Log In</button>
                    </form>

                    <div className="login-footer">
                        Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
