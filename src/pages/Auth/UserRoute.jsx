import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const user = JSON.parse(localStorage.getItem("dataUser"));

  return user.role == "user" ? <Outlet /> : <Navigate to="/forbidden" />;
};

export default UserRoute;
