import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const AdminDashboard = () => {
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("projectId");
        setProjectId(id);
    }, []);

    const handleDeploy = () => {
        window.location.href = "/deploy";
    };

    const handleGrant = () => {
        window.location.href = "/grant-permission";
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    };

    const boxStyle = {
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "400px",
    };

    const titleStyle = {
        fontSize: "24px",
        marginBottom: "10px",
        color: "#333",
    };

    const subtitleStyle = {
        fontSize: "16px",
        marginBottom: "25px",
        color: "#666",
    };

    const buttonContainer = {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    };

    const deployButtonStyle = {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
    };

    const grantButtonStyle = {
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
    };

    return (
        <>
            <Header />
            <div style={containerStyle}>
                <div style={boxStyle}>
                    <h2 style={titleStyle}>Admin Dashboard</h2>

                    {projectId ? (
                        <p style={{ color: "#555", marginBottom: "10px" }}>
                            <strong>Project ID:</strong> {projectId}
                        </p>
                    ) : (
                        <p style={{ color: "#999", marginBottom: "10px" }}>No project found in localStorage.</p>
                    )}

                    <p style={subtitleStyle}>What would you like to do?</p>

                    <div style={buttonContainer}>
                        <button
                            onClick={handleDeploy}
                            style={deployButtonStyle}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                        >
                            Deploy Project
                        </button>

                        <button
                            onClick={handleGrant}
                            style={grantButtonStyle}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#1e7e34")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                        >
                            Grant Deploy Permission
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;