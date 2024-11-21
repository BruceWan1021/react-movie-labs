import React from "react"; 
import LoginForm from "../components/loginForm";

const LoginPage = () => {
    return (
        <div style={styles.container}>
            <h2>Login to TMDb</h2>
            <LoginForm />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: 'auto'
    }
};

export default LoginPage;
