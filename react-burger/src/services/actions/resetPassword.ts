
import { request } from "../utils/api";
import { TPassword } from "../utils/data";

export const REQUEST_FORGOT_PASSWORD_API = "REQUEST_FORGOT_PASSWORD_API";
export const REQUEST_FORGOT_PASSWORD_API_SUCCESS =
  "REQUEST_FORGOT_PASSWORD_API_SUCCESS";
export const REQUEST_FORGOT_PASSWORD_API_FAILED =
  "REQUEST_FORGOT_PASSWORD_API_FAILED";

export function getForgotPassword(json: JSON) {
  return async function (dispatch: any) {
    dispatch({ type: REQUEST_FORGOT_PASSWORD_API });

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      await request("password-reset", options);

      dispatch({
        type: REQUEST_FORGOT_PASSWORD_API_SUCCESS,
      });
    } catch (error: unknown) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = "Неизвестная ошибка"
      }
      dispatch({
        type: REQUEST_FORGOT_PASSWORD_API_FAILED,
        payload: message,
      });
    }
  };
}

export function getResetPassword(json: TPassword) {
  return async function (dispatch: any) {
    dispatch({ type: REQUEST_FORGOT_PASSWORD_API });

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      await request("password-reset/reset", options);

      dispatch({
        type: REQUEST_FORGOT_PASSWORD_API_SUCCESS,
      });
    } catch (error: unknown) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = "Неизвестная ошибка"
      }
      dispatch({
        type: REQUEST_FORGOT_PASSWORD_API_FAILED,
        payload: message,
      });
    }
  };
}
