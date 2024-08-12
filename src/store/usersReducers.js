import Cookies from "js-cookie";

// Mengambil data pengguna dari cookie
const userDataFromCookie = Cookies.get("dataUser");

const DEFAULT_STATE = {
   dataUser: userDataFromCookie ? JSON.parse(userDataFromCookie) : null, // Menggunakan JSON.parse jika data disimpan sebagai string JSONdataUser: userDataFromCookie // Menggunakan JSON.parse jika data disimpan sebagai string JSON
};

// Reducer untuk pengguna
export const usersReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // Anda dapat menambahkan action handlers di sini jika diperlukan
    default:
      return state; // Mengembalikan state saat ini
  }
};