import Cookies from "js-cookie";

// Mengambil data pengguna dari cookie
const userDataFromCookie = Cookies.get("dataUser");

const DEFAULT_STATE = {
   dataUser: userDataFromCookie // Menggunakan JSON.parse jika data disimpan sebagai string JSONdataUser: userDataFromCookie // Menggunakan JSON.parse jika data disimpan sebagai string JSON
};

// Reducer untuk pengguna
export const usersReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'MASUK':
      return {
        ...state,
        dataUser: action.payload,
      };
    case 'KELUAR':
      return {
        ...state,
        dataUser: null,
      };
    default:
      return state;
  }
};