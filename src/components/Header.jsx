import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        toast.info("Logged out successfully!");
        navigate("/login");
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    };

    const titleStyle = {
        fontSize: "24px",
        fontWeight: "600",
        color: "#333",
    };

    const buttonStyle = {
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 18px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>DeploymentJS</h1>
            <button
                style={buttonStyle}
                onClick={handleLogout}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#b52a38")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
                Logout
            </button>
        </header>
    );
}
