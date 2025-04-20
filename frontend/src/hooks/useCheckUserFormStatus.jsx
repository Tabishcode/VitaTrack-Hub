// src/hooks/useCheckUserFormStatus.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useCheckUserFormStatus() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFormStatus = async () => {
      try {
        const res = await axios.get("/api/user/profile");
        const user = res.data.user;

        if (user?.calories) {
          navigate("/FoodDashboard", { replace: true });
        } else {
          setLoading(false); // ✅ allow rendering only when user is not redirected
        }
      } catch (err) {
        console.error("Error checking user form status:", err);
        // Optionally redirect to login or show error
        navigate("/FoodForm", { replace: true });
      }
    };

    checkFormStatus();
  }, [navigate]);

  return loading; // true = still checking, false = safe to render component
}

export default useCheckUserFormStatus;
