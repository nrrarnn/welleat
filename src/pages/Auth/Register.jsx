import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const toLogin = () => {
    navigate("/login");
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/i;
    if (!emailRegex.test(registerState.email)) {
      Swal.fire({
        title: "Warning",
        text: "Format email tidak valid",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      });
      return;
    }
    try {
      const response = await axios.post(
        "https://api-resep-three.vercel.app/api/v1/auth/register",
        {
          username: registerState.username,
          password: registerState.password,
          email: registerState.email,
        }
      );
      if (response) {
        Swal.fire({
          title: "Confirmation",
          text: `${registerState.username} Anda Berhasil Registrasi`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (error) {
      if (error.message === "Network Error") {
        Swal.fire({
          title: "Warning",
          text: "Tidak terkoneksi ke database",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(255 10 10)",
        });
      } else if (error.response && error.response.data.message) {
        Swal.fire({
          title: "Warning",
          text: "Email sudah terdaftar",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(255 10 10)",
        });
      }
    }
  };

  return (
    <>
      <div
        className="bg-white w-screen h-screen text-black"
      >
        <div
          className="bg-white shadow-md text-black navbar w-screen h-[10vh] md:h-[15vh] flex justify-between px-8 md:px-16 items-center"
          id="navbar"
        >
          <span
            className="text-lg lg:text-3xl font-bold text-[#0396C7]"
            id="logo"
          >
            WELLEAT
          </span>
          <span
            onClick={toLogin}
            className="underline text-xs lg:text-lg font-bold text-[rgb(130,130,130)] cursor-pointer"
            id="sign-up-link"
          >
            Masuk
          </span>
        </div>

        <form onSubmit={handleRegister} id="login-form">
          <div className="flex flex-col py-[8vh] h-[80vh] md:h-[60vh] lg:h-[80%] justify-center items-center gap-5">
            <span
              className="font-bold text-[2.8rem] mb-5 font-['Poppins']"
              id="sign-in-heading"
            >
              Register
            </span>
            <input
              value={registerState.username}
              onChange={(e) =>
                setRegisterState((prev) => ({ ...prev, username: e.target.value }))
              }
              type="text"
              placeholder="Username"
              className="px-5 py-3 w-10/12 lg:w-1/3 rounded-3xl bg-white text-gray-400 border-2"
              required
              id="username-input"
            />
            <input
              value={registerState.email}
              onChange={(e) =>
                setRegisterState((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="E-mail"
              className="px-5 py-3 w-10/12 lg:w-1/3 rounded-3xl bg-white text-gray-400 border-2"
              required
              id="email-input"
            />
            <input
              value={registerState.password}
              onChange={(e) =>
                setRegisterState((prev) => ({ ...prev, password: e.target.value }))
              }
              type={registerState.passwordVisible ? "text" : "password"}
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
                      setRegisterState((prev) => ({
                        ...prev,
                        passwordVisible: !prev.passwordVisible,
                      }))
                    }
                    checked={registerState.passwordVisible}
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
                Sudah punya akun?{" "}
                <span
                  onClick={toLogin}
                  className="cursor-pointer underline ml-3 text-[#041DFF]"
                  id="register-link"
                >
                  Masuk
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
