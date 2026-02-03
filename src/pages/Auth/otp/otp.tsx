import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/client';
import { ChevronLeft } from 'lucide-react';
import styles from './Otp.module.css';
import otplogo from '../../../assets/auth/otplogo.svg';

export const OtpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { email?: string };

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [timeLeft, setTimeLeft] = useState(10);
    const [canResend, setCanResend] = useState(false);
    const isSubmittingRef = React.useRef(false);
    const isResendingRef = React.useRef(false);

    useEffect(() => {
        // Enforce navigation flow
        if (!state?.email) {
            navigate('/signup', { replace: true });
        }
    }, [state, navigate]);

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

    const handleResend = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!canResend || !state?.email || isResendingRef.current) return;

        isResendingRef.current = true;

        // Optimistic update: Disable button and start timer immediately
        setCanResend(false);
        setTimeLeft(10);

        setError(null);
        setSuccessMessage(null);

        try {
            await apiClient.post('/auth/resend-otp', { email: state.email });
            setSuccessMessage('Code, Resent Successfully!');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to resend code.');
            // Revert state if API fails
            setTimeLeft(0);
            setCanResend(true);
        } finally {
            isResendingRef.current = false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!state?.email || isSubmittingRef.current) return;

        isSubmittingRef.current = true;
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await apiClient.post('/auth/verify-otp', { email: state.email, otp });
            // Navigate to login on success
            navigate('/login');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Verification failed. Invalid or expired OTP.');
            isSubmittingRef.current = false; // Only reset if failed, if success we navigate away
        } finally {
            setIsLoading(false);
            // subtle: if success, we navigated, so this component unmounts. 
            // if we stay, strict mode might double invoke, but ref handles real clicks.
            if (isSubmittingRef.current) {
                isSubmittingRef.current = false;
            }
        }
    };

    if (!state?.email) return null; // Or a loading spinner while redirecting

    return (
        <div className={styles.container}>

            <div className={styles.formSection}>
                <div className={styles.formHeaderLogo}>
                    <img src={otplogo} alt="Pixby Branding" className={styles.authLogoImage} />
                </div>
                <div className={styles.formWrapper}>
                    <div data-layer="backicon" className={styles.backicon} >
                        <ChevronLeft className="w-[20px] h-[20px] text-[#ffffff]" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                    </div>

                    <div className={styles.title}>
                        <h2>Verify your email</h2>
                        <p className={styles.subtitle}>We have sent a verification code to your <b style={{ color: "#ffffff" }}>{state.email}</b>.</p>
                    </div>

                    {(error || successMessage) && (
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                        </div>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        {canResend ? (
                            <>Didn't receive? <Link to="#" onClick={handleResend} className={styles.link}>Resend code</Link></>
                        ) : (
                            <>Resend code in <span style={{ color: "white", fontWeight: "600" }}>{formatTime(timeLeft)}</span></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
