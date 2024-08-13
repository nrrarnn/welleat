const idUser = localStorage.getItem("userId");

const DEFAULT_STATE = {
   id: idUser 
}

// Reducer untuk pengguna
export const idUsersReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'MASUKID':
      return {
        ...state,
        id: action.payload,
      };
    case 'KELUARID':
      return {
        ...state,
        id: null,
      };
    default:
      return state;
  }
};