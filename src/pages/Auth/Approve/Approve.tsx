import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../../../api/client';
import { ChevronLeft } from 'lucide-react';
import styles from '../otp/Otp.module.css';
import otplogo from '../../../assets/auth/otplogo.svg';

export const ApprovePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get email from query params first, fallback to state
    const emailStr = searchParams.get('email');
    const state = location.state as { email?: string, message?: string, approval_sent_at?: string };
    const email = emailStr || state?.email;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(state?.message || null);
    const [lastSentAt, setLastSentAt] = useState<string | null>(state?.approval_sent_at || null);
    const [cooldown, setCooldown] = useState(0);

    // Fetch initial status if refreshed
    useEffect(() => {
        const fetchStatus = async () => {
            if (!email) return;
            try {
                const response = await apiClient.get(`/auth/approval-status?email=${encodeURIComponent(email)}`);
                if (response.data?.approval_sent_at) {
                    setLastSentAt(response.data.approval_sent_at);
                }
            } catch (err) {
                console.error("Failed to fetch approval status", err);
            }
        };

        // If we don't have lastSentAt from state, we should fetch it (e.g. on page refresh)
        if (!state?.approval_sent_at) {
            fetchStatus();
        }
    }, [email, state?.approval_sent_at]);

    useEffect(() => {
        // Enforce navigation flow
        if (!email) {
            navigate('/signup', { replace: true });
        }
    }, [email, navigate]);

    useEffect(() => {
        if (!lastSentAt) {
            setCooldown(0);
            return;
        }

        const sentTime = new Date(lastSentAt).getTime();
        const now = new Date().getTime();
        const diffInSeconds = Math.floor((now - sentTime) / 1000);
        const remaining = 3600 - diffInSeconds; // 1 hour = 3600 seconds

        const initialCooldown = remaining > 0 ? remaining : 0;
        setCooldown(initialCooldown);

        if (initialCooldown > 0) {
            const timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [lastSentAt]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleRequestApproval = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!email || cooldown > 0) return;

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await apiClient.post('/auth/request-approval', { email: email });
            setSuccessMessage('Approval request sent successfully! We will notify you once approved.');
            if (response.data?.approval_sent_at) {
                setLastSentAt(response.data.approval_sent_at);
            } else {
                setLastSentAt(new Date().toISOString());
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to send approval request.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!email) return null;

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
                        <h2>Account Approval</h2>
                        <p className={styles.subtitle}>Your email is verified, but your account needs to be approved by the Pixby team before you can log in.</p>
                    </div>

                    {(error || successMessage) && (
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                        </div>
                    )}

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={handleRequestApproval}
                            className={styles.button}
                            disabled={isLoading || cooldown > 0}
                            style={{
                                backgroundColor: cooldown > 0 ? '#555' : '#4CAF50',
                                color: cooldown > 0 ? '#aaa' : 'white',
                                width: '100%',
                                cursor: cooldown > 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading ? 'Sending Request...' : (cooldown > 0 ? `Resend Available in ${formatTime(cooldown)}` : 'Send Approval Email to Pixby Team')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
