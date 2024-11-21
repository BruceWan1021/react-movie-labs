import React, { useState, useEffect } from 'react';
import { getRequestToken, createSession } from '../../api/tmdb-api';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [requestToken, setRequestToken] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('request_token');
        if (token) {
            createSession(token)
                .then((session) => {
                    setSessionId(session);
                    sessionStorage.setItem('sessionId', session);
                    setIsAuthenticated(true);
                    setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                    }, 1000);
                })
                .catch((error) => {
                    setIsAuthenticated(false);
                    console.error("Error creating session:", error);
                    alert("Fail create session")
                });
        }
    }, []);

    const handleGetRequestToken = async () => {
        try {
            const token = await getRequestToken();
            setRequestToken(token);
            alert("Request token generated. Please authorize the app.");
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${encodeURIComponent(window.location.href)}`;
        } catch (error) {
            console.error("Error generating request token:", error);
        }
    };

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                TMDB Login
            </Typography>
            {!isAuthenticated ? (
                <>
                    <Button 
                        onClick={handleGetRequestToken} 
                        variant="contained" 
                        color="primary"
                        style={{ margin: '10px', padding: '10px 20px' }}
                    >
                        Get Authorization
                    </Button>
                </>
            ) : (
                <>
                    <Alert severity="success">Session created successfully!</Alert>
                </>
            )}
        </Container>
    );
};

export default LoginForm;