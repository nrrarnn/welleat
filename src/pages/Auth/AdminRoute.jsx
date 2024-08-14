import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AdminRoute = () => {
  const user = JSON.parse(Cookies.get("dataUser"));
  return user.role == "admin" ? <Outlet /> : <Navigate to="/forbidden" />;
};
export default AdminRoute;
