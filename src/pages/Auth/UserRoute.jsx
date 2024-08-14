import { Navigate, Outlet } from "react-router-dom";
import store from "../../store/store";

const UserRoute = () => {
  const state = store.getState();
  const user = state.users.dataUser;

  return user.role == "user" ? <Outlet /> : <Navigate to="/forbidden" />;
};

export default UserRoute;
