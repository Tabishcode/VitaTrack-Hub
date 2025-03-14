import React from "react";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login"); // Redirect to the login page
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Access Denied</h2>
            <p style={styles.message}>
                You are not logged in. Please log in to access this feature.
            </p>
            <button style={styles.button} onClick={handleLoginRedirect}>
                Go to Login
            </button>
        </div>
    );
};

// Inline styles for simplicity
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
    },
    heading: {
        fontSize: "2rem",
        color: "#dc3545", // Red color
        marginBottom: "1rem",
    },
    message: {
        fontSize: "1.2rem",
        color: "#333",
        marginBottom: "1.5rem",
    },
    button: {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "0.25rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

// Add hover effect
styles.button[":hover"] = {
    backgroundColor: "#0056b3",
};

export default NotLoggedIn;
