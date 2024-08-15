import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import store from "../store/store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = store.getState();
  const user = state.users.dataUser;
  const token = localStorage.getItem("authToken");

  const handleLogout = async () => {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("dataUser");
    console.log("lewat");

    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "KELUAR" });
  };

  const onLogout = () => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Kamu ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Optionally add a loading indicator
        Swal.showLoading();

        // Call the logout handler
        handleLogout()
          .then(() => {
            // Show a success message or redirect after logout
            Swal.fire({
              title: "Logged out",
              text: "You have been logged out successfully.",
              icon: "success",
            }).then(() => {
              // Redirect to login or homepage if needed
              navigate("/login");
            });
          })
          .catch((error) => {
            // Handle any errors that occur during logout
            Swal.fire({
              title: "Error",
              text: `Something went wrong during logout. ${error}`,
              icon: "error",
            });
          });
      }
    });
  };

  const showProfile = () => {
    const admin = user.role === "admin";

    if (admin) {
      navigate("/dashboard-admin");
    } else {
      navigate("/homepage-user");
    }
  };

  return (
    <header className="sticky font-poppins top-0 flex h-20 w-full bg-white shadow-md px-12 justify-between items-center z-50">
      <div className="flex justify-center items-center">
        <img src="./img/logo.png" alt="Logo" className="w-[40px] h-[40px]" />
        <h1 className="font-bold text-sky-600 text-xl">
          <span className="text-slate-900">Well</span>Eat.
        </h1>
      </div>
      <div className="flex">
        {token ? (
          <ul className="lg:flex hidden gap-5 font-medium text-slate-700 cursor-pointer">
            <li className="hover:text-sky-500">
              <Link to="/">Beranda</Link>
            </li>
            <li className="hover:text-sky-500">
              <Link to="/daftar-product">Daftar Product</Link>
            </li>
            <li className="hover:text-sky-500">
              <Link to="/favorite">Favorite</Link>
            </li>
          </ul>
        ) : (
          <ul className="lg:flex hidden gap-5 font-medium text-slate-700 cursor-pointer">
            <li className="hover:text-sky-500">
              <a href="#home">Beranda</a>
            </li>
            <li className="hover:text-sky-500">
              <a href="#about">Tentang</a>
            </li>
            <li className="hover:text-sky-500">
              <a href="#testimoni">Testimoni</a>
            </li>
            <li className="hover:text-sky-500">
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        )}
      </div>
      {token ? (
        <div className="flex gap-3 items-center">
          <div>{user.username}</div>
          <Dropdown>
            <DropdownTrigger>
              <Avatar />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="profile">
                <Button color="primary" variant="flat" onClick={showProfile}>
                  Profile
                </Button>
              </DropdownItem>
              <DropdownItem key="logout">
                <Button color="danger" variant="flat" onClick={onLogout}>
                  Logout
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="">
          <Link to={"/login"}>
            <button className="px-5 py-2 bg-sky-400 rounded-full text-white font-medium">
              Masuk
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
