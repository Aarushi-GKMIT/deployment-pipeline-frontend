import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "ADMIN",
        projectId: "",
        gitHubToken: "",
    });

    const navigate = useNavigate();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role,
            };

            if (form.role === "USER") {
                payload = {
                    ...payload,
                    projectId: form.projectId,
                    gitHubToken: form.gitHubToken,
                };
            }

            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: payload,
            };

            await axios.request(config);
            toast.success("Signup successful!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error("Signup failed");
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

    const linkStyle = {
        textAlign: "center",
        marginTop: "12px",
        fontSize: "14px",
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2 style={titleStyle}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <select name="role" value={form.role} onChange={handleChange} required style={inputStyle}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    {/* Extra fields only visible for USER role */}
                    {form.role === "USER" && (
                        <>
                            <input
                                name="projectId"
                                placeholder="Project ID"
                                value={form.projectId}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                            <input
                                name="gitHubToken"
                                placeholder="GitHub Token"
                                value={form.gitHubToken}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </>
                    )}

                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                    >
                        Sign Up
                    </button>
                </form>
                <div style={linkStyle}>
                    Already have an account?{" "}
                    <span style={{ color: "#007bff", cursor: "pointer" }} onClick={() => navigate("/login")}>
                        Sign in
                    </span>
                </div>
            </div>
        </div>
    );
}
