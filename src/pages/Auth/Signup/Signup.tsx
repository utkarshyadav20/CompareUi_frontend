import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Signup.css';
import authSideImage from '../../../assets/auth/login.png';
import logo from '../../../assets/auth/logo.svg';

export const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-container">
            <div className="signup-banner">
                <img src={authSideImage} alt="Pixby Branding" className="auth-side-image" />
            </div>

            <div className="signup-form-section">
                <div className="form-wrapper">
                    <div className="form-header-logo">
                        <img src={logo} alt="Pixby Branding" className="auth-logo-image" />
                    </div>

                   <h2 className="signup-title">Sign Up</h2>
                    <form className="signup-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Enter your email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Create password</label>
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

                        <button type="submit" className="signup-button">Verify Email</button>
                    </form>

                    <div className="signup-footer">
                        Already have an account? <Link to="/login" className="link">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
