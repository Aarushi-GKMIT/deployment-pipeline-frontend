import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const AuthGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        const projectId = localStorage.getItem("projectId");

        if (!role || !token) {
            navigate("/login", { replace: true });
            return;
        }

        if ((!projectId || projectId === "null") && location.pathname !== "/project" && role === "ADMIN") {
            navigate("/project", { replace: true });
            return;
        }

        if (projectId && projectId !== "null" && location.pathname === "/project") {
            if (role === "ADMIN") {
                navigate("/admin-dashboard", { replace: true });
                return;
            } else if (role === "USER") {
                navigate("/deploy", { replace: true });
                return;
            }
        }
    }, [navigate, location]);

    return <Outlet />;
};

export default AuthGuard;