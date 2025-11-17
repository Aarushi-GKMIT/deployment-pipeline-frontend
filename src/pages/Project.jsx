import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function Project() {
    const [form, setForm] = useState({ name: "", gitUrl: "", adminGithubToken: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to create a project");
                return;
            }

            const payload = {
                name: form.name,
                gitUrl: form.gitUrl,
                adminGithubToken: form.adminGithubToken,
            };

            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_URL}/api/project`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: payload,
            };

            const res = await axios.request(config);

            localStorage.setItem("projectId", res.data.project.projectId);
            toast.success("Project created successfully!");
            navigate("/admin-dashboard");
        } catch (err) {
            console.error(err);
            toast.error("Project creation failed");
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
    };

    const titleStyle = {
        textAlign: "center",
        fontSize: "28px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "24px",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
        outline: "none",
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
                    <h2 style={titleStyle}>Create Project</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="name"
                            placeholder="Project Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <input
                            name="gitUrl"
                            placeholder="GitHub Repository URL"
                            value={form.gitUrl}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <input
                            name="adminGithubToken"
                            type="password"
                            placeholder="GitHub Personal Access Token"
                            value={form.adminGithubToken}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <button
                            type="submit"
                            style={buttonStyle}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                        >
                            Create Project
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}