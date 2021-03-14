import { LOGIN_USER, REGISTER_USER } from "../actions/types";

const userState = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, success: action.payload };
    default:
      return state;
  };
};

export default userState;
