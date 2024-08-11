import { useState } from "react";
import bgCoverUser from "../img/Rectangle 2775.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState({
    nama_lengkap: "",
    username: "",
    password: "",
    showPassword: false,
    email: "",
    nomor_hp: "",
  });

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
        "https://66b837cf3ce57325ac76a6e4.mockapi.io/:endpoint",
        {
          nama_lengkap: registerState.nama_lengkap,
          username: registerState.username,
          password: registerState.password,
          jenis_kelamin: registerState.jenis_kelamin,
          email: registerState.email,
          nomor_hp: registerState.nomor_hp,
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
    <div
      id="register-container"
      className="h-screen w-screen flex justify-center items-center font-['Poppins']"
    >
      <div id="register-main" className="main h-[85vh] w-[90vw]">
        <div id="title-container" className="title flex flex-col mb-8">
          <span
            id="register-title"
            className="font=['Poppins'] text-xl font-semibold text-[#333333]"
          >
            Register
          </span>
          <span
            id="register-subtitle"
            className="text-[#828282] text-sm font-semibold"
          >
            Menambah akun
          </span>
        </div>

        <div id="shadow-container" className="shadow-md h-[75vh] rounded-md">
          <div
            id="image-container"
            className="container w-full md:h-[17vh] h-[10vh"
          >
            <img src={bgCoverUser} className="h-full w-full" alt="bgCover" />
          </div>

          <div
            id="form-container"
            className="flex flex-col justify-start items-center mt-5 md:px-0 px-3"
          >
            <span
              id="form-title"
              className="text-[#333333] font-bold font-['Poppins']"
            >
              Users Profil
            </span>
            <form onSubmit={handleRegister} id="register-form">
              <div
                id="form-fields"
                className="flex md:flex-row flex-col justify-center items-start md:gap-16 gap-5 mt-5"
              >
                <div className="flex flex-col md:w-1/2 w-full items-start">
                  <span id="nama-lengkap-label">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </span>
                  <input
                    value={registerState.nama_lengkap}
                    onChange={(e) =>
                      setRegisterState((prev) => ({
                        ...prev,
                        nama_lengkap: e.target.value,
                      }))
                    }
                    maxLength={32}
                    required
                    type="text"
                    className="w-full  border-2 px-[0.4rem] py-[0.3rem] border-[#CED4DA] rounded-md"
                    id="nama-lengkap-input"
                  />
                  <div className="flex justify-center items-start gap-5">
                    <div className="flex flex-col mt-2">
                      <span id="username-label">
                        Username <span className="text-red-500">*</span>
                      </span>
                      <input
                        value={registerState.username}
                        onChange={(e) =>
                          setRegisterState((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        maxLength={15}
                        required
                        type="text"
                        className="w-full px-[0.4rem]  py-[0.3rem] border-2 border-[#CED4DA] rounded-md"
                        id="username-input"
                      />
                    </div>
                    <div className="flex flex-col mt-2">
                      <span id="password-label">
                        Password <span className="text-red-500">*</span>
                      </span>
                      <input
                        value={registerState.password}
                        onChange={(e) =>
                          setRegisterState((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        required
                        type={registerState.showPassword ? "text" : "password"}
                        className="w-full  px-[0.4rem]  py-[0.3rem] border-2 border-[#CED4DA] rounded-md"
                        id="password-input"
                      />
                      <div className="flex justify-center items-center w-11/12 md:w-9/12 mt-3 ">
                        <input
                          onChange={() =>
                            setRegisterState((prev) => ({
                              ...prev,
                              showPassword: !prev.showPassword,
                            }))
                          }
                          checked={registerState.showPassword}
                          type="checkbox"
                          name="checkbox"
                          id="checkbox"
                          className="bg-[#EDEDED] text-blue-500 text-sm"
                        />
                        <label
                          htmlFor="perempuan"
                          className="text-xs md:text-sm ml-1"
                        >
                          Tampilkan Password
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:w-1/2 w-full">
                  <span id="email-label">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    onChange={(e) =>
                      setRegisterState((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    className="w-full px-[0.4rem]  py-[0.3rem]  border-2 border-[#CED4DA] rounded-md"
                    id="email-input"
                  />
                  <span className="mt-2" id="nomor-hp-label">
                    No Handphone <span className="text-red-500">*</span>
                  </span>
                  <input
                    onChange={(e) =>
                      setRegisterState((prev) => ({
                        ...prev,
                        nomor_hp: e.target.value,
                      }))
                    }
                    type="tel"
                    pattern="[0-9]*"
                    maxLength={12}
                    className="w-full px-[0.4rem]  py-[0.3rem] border-2 border-[#CED4DA] rounded-md"
                    id="nomor-hp-input"
                  />

                  {registerState.nama_lengkap === "" && (
                    <span
                      id="login-link"
                      className="underline p-2 text-[#0396C7] cursor-pointer "
                      onClick={() => navigate("/login")}
                    >
                      Saya sudah punya akun
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="py-2  bg-[#0396C7] text-white px-5 rounded-md mt-5"
                  id="submit-button"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
