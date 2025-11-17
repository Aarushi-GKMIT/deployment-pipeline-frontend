import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Result() {
    const url = localStorage.getItem("deployUrl");
    const role = localStorage.getItem("role");
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
        fontSize: "26px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "16px",
    };

    const subtitleStyle = {
        fontSize: "16px",
        color: "#555",
        marginBottom: "20px",
        lineHeight: "1.5",
    };

    const linkStyle = {
        display: "inline-block",
        backgroundColor: "#007bff",
        color: "#fff",
        textDecoration: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        fontWeight: "500",
        transition: "background-color 0.3s ease",
        marginBottom: "20px",
    };

    const buttonStyle = {
        margin: "10px",
        display: "inline-block",
        width: "auto",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        fontSize: "15px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        marginTop: "10px",
    };

    const handleMouseOver = (e) => (e.target.style.backgroundColor = "#0056b3");
    const handleMouseOut = (e) => (e.target.style.backgroundColor = "#007bff");

    const handleBackHover = (e) => (e.target.style.backgroundColor = "#5a6268");
    const handleBackOut = (e) => (e.target.style.backgroundColor = "#6c757d");

    return (
        <>
            <Header />
            <div style={containerStyle}>
                <div style={boxStyle}>
                    <h2 style={titleStyle}>Deployment in Progress</h2>
                    <p style={subtitleStyle}>Please wait for a few seconds while we finish deploying your project.</p>
                    <p style={{ color: "#666", marginBottom: "24px" }}>
                        Once it’s done, your project will be available at:
                    </p>

                    {url ? (
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            style={linkStyle}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Visit Deployment
                        </a>
                    ) : (
                        <p style={{ color: "red" }}>No deployment URL found.</p>
                    )}

                    <button
                        onClick={() => {
                            if (role === "USER") navigate("/deploy");
                            if (role === "ADMIN") navigate("/admin-dashboard");
                        }}
                        style={buttonStyle}
                        onMouseOver={handleBackHover}
                        onMouseOut={handleBackOut}
                    >
                        ⬅ Back to Dashboard
                    </button>
                </div>
            </div>
        </>
    );
}