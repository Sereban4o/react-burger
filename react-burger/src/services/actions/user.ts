import { refreshTokenRequest, request, saveTokens } from "../utils/api";
import { TLoginUser, TUser } from "../utils/data";
import { deleteCookie, getCookie, setCookie } from "../utils/utils";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_REQEST = "GET_USER_REQEST";
export const REMOVE_USER = "REMOVE_USER";

export const refreshToken = (afterRefresh: any) => (dispatch: any) => {
  refreshTokenRequest().then((res) => {
    saveTokens(res.refreshToken, res.accessToken);
    dispatch(afterRefresh);
  });
};

export function getUserAPI() {
  return async function (dispatch: any) {
    dispatch({ type: GET_USER_REQEST });

    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: getCookie("accessToken"),
        },
      };

      const dataAPI = await request("auth/user", options);

      dispatch({
        type: GET_USER_SUCCESS,
        user: dataAPI.user,
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
      if (message === "jwt expired") {
        dispatch(refreshToken(getUserAPI()));
      } else {
        dispatch({
          type: GET_USER_FAILED,
          payload: message,
        });
      }
    }
  };
}

export function signInAPI(user: TLoginUser) {
  return async function (dispatch: any) {
    dispatch({ type: GET_USER_REQEST });

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const dataAPI = await request("auth/login", options);

      dispatch({
        type: GET_USER_SUCCESS,
        user: dataAPI.user,
      });

      setCookie("accessToken", dataAPI.accessToken, null);
      localStorage.setItem("refreshToken", dataAPI.refreshToken);
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
        type: GET_USER_FAILED,
        payload: message,
      });
    }
  };
}

export function signOutAPI() {
  return async function (dispatch: any) {
    dispatch({ type: GET_USER_REQEST });

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const dataAPI = await request("auth/logout", options);

      dispatch({
        type: REMOVE_USER,
        user: dataAPI.user,
      });

      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
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
        type: GET_USER_FAILED,
        payload: message,
      });
    }
  };
}

export function saveUserAPI(user: TUser) {
  return async function (dispatch: any) {
    dispatch({ type: GET_USER_REQEST });

    try {
      const options = {
        method: "PATCH",
        body: JSON.stringify({ user }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: getCookie("accessToken"),
        },
      };

      const dataAPI = await request("auth/user", options);

      dispatch({
        type: GET_USER_SUCCESS,
        user: dataAPI.user,
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
      if (message === "jwt expired") {
        dispatch(refreshToken(saveUserAPI(user)));
      } else {
        dispatch({
          type: GET_USER_FAILED,
          payload: message,
        });
      }
    }
  };
}
