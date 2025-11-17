import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function GrantPermission() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("You must be logged in to create a project");
                    return;
                }
                const config = {
                    method: "get",
                    url: `${import.meta.env.VITE_BACKEND_URL}/api/admin/getUsers`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const res = await axios.request(config);
                setUsers(res.data.projectUsers || []);
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const togglePermission = async (userId, currentValue) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to create a project");
                return;
            }

            const config = {
                method: "patch",
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_URL}/api/admin/permissionsUpdate/${userId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    canDeploy: !currentValue,
                },
            };

            await axios.request(config);

            toast.success("Permission updated");
            setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, canDeploy: !currentValue } : u)));
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update permission");
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
        width: "90%",
        maxWidth: "800px",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: "28px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "8px",
    };

    const subtitleStyle = {
        fontSize: "16px",
        color: "#555",
        marginBottom: "24px",
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "16px",
    };

    const cellStyle = {
        border: "1px solid #ddd",
        padding: "10px",
        textAlign: "center",
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                <div style={boxStyle}>
                    <h2 style={titleStyle}>Loading users...</h2>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div style={containerStyle}>
                <div style={boxStyle}>
                    <h2 style={titleStyle}>Grant Deploy Permissions</h2>
                    <p style={subtitleStyle}>Toggle deploy access for users below:</p>

                    {users.length === 0 ? (
                        <p>No users found for this project.</p>
                    ) : (
                        <table style={tableStyle}>
                            <thead>
                                <tr style={{ backgroundColor: "#f1f1f1" }}>
                                    <th style={cellStyle}>Name</th>
                                    <th style={cellStyle}>Email</th>
                                    <th style={cellStyle}>Can Deploy?</th>
                                    <th style={cellStyle}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td style={cellStyle}>{user.name || "N/A"}</td>
                                        <td style={cellStyle}>{user.email}</td>
                                        <td style={cellStyle}>{user.canDeploy ? "Yes" : "No"}</td>
                                        <td style={cellStyle}>
                                            <button
                                                onClick={() => togglePermission(user.id, user.canDeploy)}
                                                style={{
                                                    padding: "8px 12px",
                                                    borderRadius: "8px",
                                                    border: "none",
                                                    background: user.canDeploy ? "#dc3545" : "#28a745",
                                                    color: "white",
                                                    cursor: "pointer",
                                                    fontWeight: "500",
                                                    transition: "background-color 0.3s ease",
                                                }}
                                                onMouseOver={(e) =>
                                                    (e.target.style.backgroundColor = user.canDeploy
                                                        ? "#a71d2a"
                                                        : "#1e7e34")
                                                }
                                                onMouseOut={(e) =>
                                                    (e.target.style.backgroundColor = user.canDeploy
                                                        ? "#dc3545"
                                                        : "#28a745")
                                                }
                                            >
                                                {user.canDeploy ? "Revoke" : "Grant"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Back to Dashboard button */}
                    <div style={{ marginTop: "30px", textAlign: "center" }}>
                        <button
                            onClick={() => navigate("/admin-dashboard")}
                            style={{
                                display: "inline-block",
                                backgroundColor: "#6c757d",
                                color: "#fff",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "6px",
                                fontSize: "15px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease, transform 0.2s ease",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#5a6268";
                                e.target.style.transform = "scale(1.03)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#6c757d";
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            ⬅ Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

