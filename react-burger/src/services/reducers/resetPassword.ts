import { TForgotPasswordActions } from "../actions/resetPassword";
import { REQUEST_FORGOT_PASSWORD_API, REQUEST_FORGOT_PASSWORD_API_FAILED, REQUEST_FORGOT_PASSWORD_API_SUCCESS } from "../constants";

export type TForgotPasswordState = {
  request: boolean,
  requestFailed: boolean,
}

const forgotPasswordInitialState = {
  request: false,
  requestFailed: false,
};

export const resetPasswordReducer = (state = forgotPasswordInitialState, action: TForgotPasswordActions): TForgotPasswordState => {
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
