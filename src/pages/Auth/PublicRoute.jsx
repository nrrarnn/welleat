import { Navigate, Outlet, useNavigate } from "react-router-dom";
import store from "../../store/store";

const PublicRoute = () => {
  const navigate = useNavigate();
  const state = store.getState();
  let token = state.auth.token;
  let user = state.users.dataUser;
  const admin = user.role === "admin";
  const member = user.role === "user";

  if (!token || token === null) {
    return <Outlet />;
  } else {
    if (admin) {
      navigate("/dashboard-admin");
    } else if (member) {
      Navigate("/homepage-user");
    }
  }
};

export default PublicRoute;
