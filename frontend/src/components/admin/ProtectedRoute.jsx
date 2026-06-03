import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 1. Agar user logged in nahi hai, toh Home par bhej do
        if (user === null) {
            navigate("/");
        } 
        // 2. Agar user student hai aur "Admin" pages access karne ki koshish kar raha hai
        else if (location.pathname.startsWith("/admin") && user.role !== "recruiter") {
            navigate("/");
        }
        // (Optional) 3. Agar recruiter student pages par ghoom raha hai, toh admin panel bhejo
        else if (!location.pathname.startsWith("/admin") && user.role === "recruiter") {
            navigate("/admin/companies");
        }
    }, [user, navigate, location]);

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;