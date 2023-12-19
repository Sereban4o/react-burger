import {
  REQUEST_FORGOT_PASSWORD_API,
  REQUEST_FORGOT_PASSWORD_API_SUCCESS,
  REQUEST_FORGOT_PASSWORD_API_FAILED,
} from "../actions/resetPassword";

const initialState = {
  request: false,
  requestFailed: false,
};

export const resetPasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST_FORGOT_PASSWORD_API: {
      return {
        ...state,
        request: true,
      };
    }
    case REQUEST_FORGOT_PASSWORD_API_SUCCESS: {
      return {
        ...state,
        requestFailed: false,
        request: false,
      };
    }
    case REQUEST_FORGOT_PASSWORD_API_FAILED: {
      return { ...state, requestFailed: true, request: false };
    }
    default: {
      return state;
    }
  }
};
