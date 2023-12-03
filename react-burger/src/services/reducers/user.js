import {
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQEST,
  REMOVE_USER,
} from "../actions/user";

const initialState = {
  user: null,
  request: false,
  requestFailed: false,
  isAuthChecked: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQEST: {
      return {
        ...state,
        request: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        requestFailed: false,
        request: false,
        isAuthChecked: true,
      };
    }
    case REMOVE_USER: {
      return { initialState };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        requestFailed: true,
        request: false,
        isAuthChecked: true,
      };
    }
    default: {
      return state;
    }
  }
};
