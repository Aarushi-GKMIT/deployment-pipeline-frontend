import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: form,
            };

            const res = await axios.request(config);
            const { token, role, isMember, projectId } = res.data;

            localStorage.clear();
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("projectId", projectId);

            toast.success("Login successful!");

            if (role === "ADMIN") {
                navigate("/project");
            } else if (role === "USER" && isMember) {
                navigate("/deploy");
            } else {
                navigate("/access-denied");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Login failed");
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

    const linkStyle = {
        textAlign: "center",
        marginTop: "12px",
        fontSize: "14px",
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2 style={titleStyle}>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                    >
                        Login
                    </button>
                </form>

                <div style={linkStyle}>
                    Don’t have an account?{" "}
                    <span style={{ color: "#007bff", cursor: "pointer" }} onClick={() => navigate("/")}>
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
}