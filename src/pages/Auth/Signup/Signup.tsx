import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import authSideImage from '../../../assets/auth/login.png';
import logo from '../../../assets/auth/logo.png';

export const SignupPage = () => {
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
                                <input type="password" id="password" placeholder="Enter your password" />
                                <span className="password-toggle-icon">👁️</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm password</label>
                            <div className="password-input-wrapper">
                                <input type="password" id="confirm-password" placeholder="Enter your password" />
                                <span className="password-toggle-icon">👁️</span>
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
