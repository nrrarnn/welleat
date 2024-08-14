import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return function WithAuthWrapper(props) {
    const token = useSelector((state) => state.auth.token);
    const dataUser = useSelector((state) => state.users.dataUser);

    return <WrappedComponent {...props} token={token} dataUser={dataUser} />;
  };
};

export default withAuth;
