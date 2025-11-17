import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function Deploy() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const projectId = localStorage.getItem("projectId");

            if (!token) {
                toast.error("You must be logged in to create a project");
                return;
            }

            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_URL}/api/deployment`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    projectId,
                },
            };

            setLoading(true);

            const res = await axios.request(config);
            localStorage.setItem("deployUrl", res.data.deploymentUrl);

            toast.success("Deployment started! Please wait a few seconds...");
            navigate("/result");
        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.error || err.response?.data?.message || "Deployment failed";

            if (status === 403) {
                toast.error("Unauthorized: You don't have permission to deploy this project.");
            } else if (status === 400) {
                toast.error("Missing required project information.");
            } else {
                toast.error(message);
            }
        } finally {
            setLoading(false);
        }
    };

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
        maxWidth: "400px",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: "28px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "24px",
    };

    const subtitleStyle = {
        fontSize: "16px",
        color: "#555",
        marginBottom: "20px",
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    return (
        <>
            <Header />
            <div style={containerStyle}>
                <div style={boxStyle}>
                    <h2 style={titleStyle}>Deploy Project</h2>
                    <p style={subtitleStyle}>Click below to start deployment for your project.</p>

                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...buttonStyle,
                                backgroundColor: loading ? "#6c757d" : "#007bff",
                                cursor: loading ? "not-allowed" : "pointer",
                            }}
                            onMouseOver={(e) => {
                                if (!loading) e.target.style.backgroundColor = "#0056b3";
                            }}
                            onMouseOut={(e) => {
                                if (!loading) e.target.style.backgroundColor = "#007bff";
                            }}
                        >
                            {loading ? "Deploying..." : "Deploy"}
                        </button>
                    </form>

                    <p
                        style={{
                            marginTop: "16px",
                            fontSize: "14px",
                            color: "#555",
                        }}
                    >
                        Ensure your GitHub repository is accessible and linked correctly.
                    </p>
                </div>
            </div>
        </>
    );
}
