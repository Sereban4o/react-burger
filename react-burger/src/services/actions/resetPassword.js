import { request } from "../utils/api";

export const REQUEST_FORGOT_PASSWORD_API = "REQUEST_FORGOT_PASSWORD_API";
export const REQUEST_FORGOT_PASSWORD_API_SUCCESS =
  "REQUEST_FORGOT_PASSWORD_API_SUCCESS";
export const REQUEST_FORGOT_PASSWORD_API_FAILED =
  "REQUEST_FORGOT_PASSWORD_API_FAILED";

export function getForgotPassword(json) {
  return async function (dispatch) {
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
    } catch (error) {
      dispatch({
        type: REQUEST_FORGOT_PASSWORD_API_FAILED,
        payload: error.message,
      });
    }
  };
}

export function getResetPassword(json) {
  return async function (dispatch) {
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
    } catch (error) {
      dispatch({
        type: REQUEST_FORGOT_PASSWORD_API_FAILED,
        payload: error.message,
      });
    }
  };
}
