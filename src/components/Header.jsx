import { Link, useNavigate } from "react-router-dom";
import withAuth from "../hoc/withAuth";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const Header = ({ dataUser, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("dataUser")
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "KELUAR" });
    navigate("/");
  };

  const onLogout = () => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Kamu ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  return (
    <>
      <header className="sticky font-poppins top-0 flex h-20 w-full bg-white shadow-md px-12 justify-between items-center z-50">
        <div className="flex justify-center items-center">
          <img src="./img/logo.png" alt="Logo" className="w-[40px] h-[40px]" />
          <h1 className="font-bold text-sky-600 text-xl">
            <span className="text-slate-900">Well</span>Eat.
          </h1>
        </div>
        <div className="flex">
          {
            token ? (
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
            )
          }
          
        </div>
        {token ? (
          <div className="flex gap-3 items-center">
            <div>{dataUser.username}</div>
            <Dropdown>
              <DropdownTrigger>
                <Avatar />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="delete">
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
    </>
  );
};

export default withAuth(Header);
