import { Navigate, Outlet } from "react-router-dom";
import store from "../../store/store";

const PublicRoute = () => {
  const state = store.getState();
  const token = localStorage.getItem("authToken");
  console.log("🚀 ~ PublicRoute ~ token:", token);
  const user = state.users.dataUser;
  console.log("🚀 ~ PublicRoute ~ user:", user);

  if (token) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard-admin" />;
    } else if (user.role === "user") {
      return <Navigate to="/homepage-user" />;
    }
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
