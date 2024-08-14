import { Navigate, Outlet } from "react-router-dom";
import store from "../../store/store";

const AdminRoute = () => {
  const state = store.getState();
  const user = state.users.dataUser;

  return user.role == "admin" ? <Outlet /> : <Navigate to="/forbidden" />;
};
export default AdminRoute;
