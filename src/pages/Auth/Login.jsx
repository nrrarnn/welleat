import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    passwordVisible: false,
  });

  const toRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://66b84cbf3ce57325ac76d207.mockapi.io/users/users"
      );

      const user = response.data.find(
        (u) =>
          u.email === loginState.email && u.password === loginState.password
      );

      if (user) {
        const token = user.id;
        const getToken = generateToken(token);

        console.log("User:", user);
        console.log("Generated Token:", getToken);

        Cookies.set("authToken", getToken);

        Swal.fire({
          title: "Confirmation",
          text: `Hello Selamat Datang`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/user");
          }
        });
      } else {
        handleLoginError("Email atau password salah");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat login:", error);
      handleLoginError("Login gagal. Silakan coba lagi.");
    }
  };
  const handleLoginError = (error) => {
    if (error.message === "Network Error") {
      Swal.fire({
        title: "Warning",
        text: "Tidak terkoneksi ke database",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      });
    } else if (
      error.response &&
      error.response.data.message === "record not found, invalid email"
    ) {
      Swal.fire({
        title: "Warning",
        text: "Anda Belum Punya akun, Anda harus registrasi dulu",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/register");
        }
      });
    } else {
      Swal.fire({
        title: "Confirmation",
        text: "Password anda Salah",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then(() => {
        setLoginState({
          email: "",
          password: "",
          passwordVisible: false,
        });
      });
    }
  };

  const generateToken = (user) => {
    return `${user}${new Date().getTime()}`;
  };

  return (
    <>
      <div
        className="bg-white w-screen h-screen text-black"
        id="login-container"
      >
        <div
          className="bg-white shadow-md text-black navbar w-screen h-[10vh] md:h-[15vh] flex justify-between px-8 md:px-16 items-center"
          id="navbar"
        >
          <span
            className="text-lg lg:text-3xl font-bold text-[#0396C7]"
            id="logo"
          >
            StoreID
          </span>
          <span
            onClick={toRegister}
            className="underline text-xs lg:text-lg font-bold text-[rgb(130,130,130)] cursor-pointer"
            id="sign-up-link"
          >
            Sign Up
          </span>
        </div>

        <form onSubmit={handleLogin} id="login-form">
          <div className="flex flex-col py-[8vh] h-[80vh] md:h-[60vh] lg:h-[80%] justify-center items-center gap-5">
            <span
              className="font-bold text-[2.8rem] mb-5 font-['Poppins']"
              id="sign-in-heading"
            >
              Sign In
            </span>
            <input
              value={loginState.email}
              onChange={(e) =>
                setLoginState((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="E-mail"
              className="px-5 py-3 w-10/12 lg:w-1/3 rounded-3xl bg-white text-gray-400 border-2"
              required
              id="email-input"
            />
            <input
              value={loginState.password}
              onChange={(e) =>
                setLoginState((prev) => ({ ...prev, password: e.target.value }))
              }
              type={loginState.passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="px-5 py-3 w-10/12 lg:w-1/3 rounded-3xl bg-white text-gray-400 border-2"
              required
              id="password-input"
            />

            <div className="flex flex-col w-[80vw] lg:w-[32vw] gap-9">
              <div
                className="flex justify-between items-center"
                id="password-checkbox"
              >
                <span className="text-[#000000]">
                  <input
                    onChange={() =>
                      setLoginState((prev) => ({
                        ...prev,
                        passwordVisible: !prev.passwordVisible,
                      }))
                    }
                    checked={loginState.passwordVisible}
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="bg-[#EDEDED] text-blue-500 text-sm"
                  />
                  <span className="text-sm md:text-base">
                    {" "}
                    Tampilkan kata sandi
                  </span>
                </span>
              </div>
              <button
                type="submit"
                className="py-3 px-10 text-white rounded-3xl font-bold font-['Poppins'] bg-[#0396C7] hover:opacity-80"
                id="sign-in-button"
              >
                Sign In
              </button>
              <span
                className="text-black flex justify-center -mt-5"
                id="no-account-message"
              >
                Belum punya akun?{" "}
                <span
                  onClick={toRegister}
                  className="cursor-pointer underline ml-3 text-[#041DFF]"
                  id="register-link"
                >
                  Daftar
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
