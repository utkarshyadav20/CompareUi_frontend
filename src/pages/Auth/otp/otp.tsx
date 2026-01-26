import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ChevronDown, ChevronLeft } from 'lucide-react';
import './Otp.css';
import authSideImage from '../../../assets/auth/login.png';
import otplogo from '../../../assets/auth/otplogo.svg';
import bgimage from '../../../assets/auth/bg.png';

export const OtpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleResend = (e: React.MouseEvent) => {
        e.preventDefault();
        if (canResend) {
            setTimeLeft(120);
            setCanResend(false);
            // Logic to trigger backend resend would go here
            console.log("Resending code...");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="Otp-container">

            <div className="Otp-form-section">
                <div className="form-header-logo">
                    <img src={otplogo} alt="Pixby Branding" className="auth-logo-image" />
                </div>
                <div className="form-wrapper">
                    <div data-layer="backicon" className="backicon" >
                        <ChevronLeft className="w-[20px] h-[20px] text-[#ffffff]" />
                    </div>

                    <div className="Otp-title">
                        <h2>Verify your email</h2>
                        <p className="Otp-subtitle" style={{ color: "#ffffff72", fontSize: "14px", fontWeight: "300", fontFamily: "DM Sans", textAlign: "center" }}>We have sent a verification code to your <b style={{ color: "#ffffff" }}>[EMAIL_ADDRESS]</b>.</p>

                    </div>
                    <form className="Otp-form">


                        <div className="form-group">

                            <input type="otp" id="otp" placeholder="enter otp" />
                        </div>


                        <button type="submit" className="Otp-button">Verify otp</button>
                    </form>

                    <div className="Otp-footer">
                        {canResend ? (
                            <>Didn't receive? <Link to="#" onClick={handleResend} className="link">Resend code</Link></>
                        ) : (
                            <>Resend code in <span style={{ color: "white", fontWeight: "600" }}>{formatTime(timeLeft)}</span></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
