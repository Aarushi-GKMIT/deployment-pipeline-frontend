import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AccessDenied() {
    const navigate = useNavigate();

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f2f4f8",
    };

    const boxStyle = {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "450px",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: "28px",
        fontWeight: "600",
        color: "#dc3545", // red tone for denied
        marginBottom: "12px",
    };

    const subtitleStyle = {
        fontSize: "16px",
        color: "#555",
        marginBottom: "28px",
        lineHeight: "1.5",
    };

    const buttonStyle = {
        display: "inline-block",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        fontSize: "15px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
    };

    const handleHover = (e) => {
        e.target.style.backgroundColor = "#5a6268";
        e.target.style.transform = "scale(1.03)";
    };

    const handleOut = (e) => {
        e.target.style.backgroundColor = "#6c757d";
        e.target.style.transform = "scale(1)";
    };

    return (
        <>
            <Header />
            <div style={containerStyle}>
                <div style={boxStyle}>
                    <h2 style={titleStyle}>Access Denied</h2>
                    <p style={subtitleStyle}>
                        You don’t have permission to <strong>deploy this project</strong>. <br />
                        Please contact your <strong>project administrator</strong> to request deploy access.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        style={buttonStyle}
                        onMouseOver={handleHover}
                        onMouseOut={handleOut}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </>
    );
}