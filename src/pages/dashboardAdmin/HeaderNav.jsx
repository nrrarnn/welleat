import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store/store";

const HeaderNav = ({ handleExpandedSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = store.getState();
  const user = state.users.dataUser;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("dataUser");
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
    <Navbar className="shadow-md py-2 font-poppins">
      <NavbarContent>
        <NavbarMenuToggle onClick={handleExpandedSidebar} />
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Avatar isBordered alt={user.username} className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" className="font-poppins">
            <DropdownItem key="username">{user.username}</DropdownItem>
            <DropdownItem
              key="username"
              onClick={() => {
                navigate("/daftar-product");
              }}
            >
              List Recipe
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={onLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNav;

HeaderNav.propTypes = {
  handleExpandedSidebar: PropTypes.func,
};
