import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("dataUser"));

  return user.role == "admin" ? <Outlet /> : <Navigate to="/forbidden" />;
};
export default AdminRoute;
