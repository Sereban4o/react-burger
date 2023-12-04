import { refreshTokenRequest, request, saveTokens } from "../utils/api";
import { deleteCookie, getCookie, setCookie } from "../utils/utils";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_REQEST = "GET_USER_REQEST";
export const REMOVE_USER = "REMOVE_USER";

export const refreshToken = (afterRefresh) => (dispatch) => {
  refreshTokenRequest().then((res) => {
    saveTokens(res.refreshToken, res.accessToken);
    dispatch(afterRefresh);
  });
};

export function getUserAPI() {
  return async function (dispatch) {
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
    } catch (error) {
      if (error.message === "jwt expired") {
        dispatch(refreshToken(getUserAPI()));
      } else {
        dispatch({
          type: GET_USER_FAILED,
          payload: error.message,
        });
      }
    }
  };
}

export function signInAPI(user) {
  return async function (dispatch) {
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

      setCookie("accessToken", dataAPI.accessToken);
      localStorage.setItem("refreshToken", dataAPI.refreshToken);
    } catch (error) {
      dispatch({
        type: GET_USER_FAILED,
        payload: error.message,
      });
    }
  };
}

export function signOutAPI() {
  return async function (dispatch) {
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
      localStorage.clear("refreshToken");
    } catch (error) {
      dispatch({
        type: GET_USER_FAILED,
        payload: error.message,
      });
    }
  };
}

export function saveUserAPI(user) {
  return async function (dispatch) {
    dispatch({ type: GET_USER_REQEST });
    console.log(user);
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
    } catch (error) {
      if (error.message === "jwt expired") {
        dispatch(refreshToken(saveUserAPI()));
      } else {
        dispatch({
          type: GET_USER_FAILED,
          payload: error.message,
        });
      }
    }
  };
}
