import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginNav = ({ role, res }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (res.isConfirmed) {
      if (role === "admin") {
        navigate("/dashboard-admin");
      } else if (role === "user") {
        navigate("/homepage-user");
      }
    }
  }, [res.isConfirmed, role, navigate]);

  // Rest of your component code
};
