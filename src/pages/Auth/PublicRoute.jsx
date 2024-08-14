import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {
  const token = Cookies.get("authToken");
  console.log("🚀 ~ PublicRoute ~ token:", token);

  let user;
  try {
    user = JSON.parse(Cookies.get("dataUser"));
  } catch (error) {
    console.error("Invalid user data", error);
    user = null;
  }

  const location = useLocation();
  if (!token || token === null) {
    return token ? null : <Outlet />;
  } else if (user) {
    const admin = user.role === "admin";
    const member = user.role === "user";

    if (admin && token) {
      return (
        <Navigate to="/dashboard-admin" state={{ from: location }} replace />
      );
    }
    if (member && token) {
      return (
        <Navigate to="/homepage-user" state={{ from: location }} replace />
      );
    }
  }
};

export default PublicRoute;