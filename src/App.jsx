import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Deploy from "./pages/Deploy";
import AuthGuard from "./AuthGuard";
import Result from "./pages/Result";
import GrantPermission from "./pages/GrantPermission";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AccessDenied from "./pages/AccessDenied";

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<AuthGuard />}>
                        <Route path="/project" element={<Project />} />
                        <Route path="/deploy" element={<Deploy />} />
                        <Route path="/result" element={<Result />} />
                        <Route path="/grant-permission" element={<GrantPermission />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/access-denied" element={<AccessDenied />} />
                    </Route>
                </Routes>       
            </div>
        </Router>
    );
}

export default App;

