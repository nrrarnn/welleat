import Cookies from "js-cookie";


const token = Cookies.get("authToken");

const DEFAULT_STATE = {
  token : token
}

export const authReducer = (state = DEFAULT_STATE, action) => {
 return state
}