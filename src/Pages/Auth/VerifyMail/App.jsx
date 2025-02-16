// src/EmailVerification.js
import React, { useEffect, useState } from 'react';
import { account } from '../../../utils/Appwrite/config';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailVerification = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userId = queryParams.get('userId');
        const secret = queryParams.get('secret');

        if (userId && secret) {
            account.updateVerification(userId, secret)
                .then(response => {
                    setMessage('Email verified successfully! Please Wait...');
                    {setTimeout(() => {
                        // Navigate to new page after timeout
                        navigate("/Interested-topics");
                      }, 2500);}
                })
                .catch(error => {
                    setMessage('Email verification failed. Please try again.');
                    {setTimeout(() => {
                        navigate("/register");
                      }, 2500);}
                });
        } else {
            setMessage('Invalid verification link.');
        }
    }, [location]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{message}</p>
        </div>
    );
};

export default EmailVerification;
