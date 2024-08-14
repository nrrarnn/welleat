import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
const LayoutUser = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutUser;
