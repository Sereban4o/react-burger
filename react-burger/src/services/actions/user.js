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

export function getUser(user, url, method, authorization = false) {
  return async function (dispatch) {
    dispatch({ type: GET_USER_REQEST });

    try {
      let post = "";
      if (authorization) {
        post = {
          method: method,
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      } else {
        post = {
          method: method,
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: getCookie("accessToken"),
          },
        };
      }

      const dataAPI = await request(url, post);

      dispatch({
        type: GET_USER_SUCCESS,
        user: dataAPI.user,
      });
      setCookie("user", JSON.stringify(user));
      setCookie("accessToken", dataAPI.accessToken);
      localStorage.setItem("refreshToken", dataAPI.refreshToken);
    } catch (error) {
      if (error.message === "jwt expired") {
        dispatch(refreshToken(getUser()));
      } else {
        dispatch({
          type: GET_USER_FAILED,
          payload: error.message,
        });
      }
    }
  };
}

export function signOutUser() {
  return async function (dispatch) {
    dispatch({ type: GET_USER_REQEST });

    try {
      const post = {
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const dataAPI = await request("auth/logout", post);

      dispatch({
        type: REMOVE_USER,
        user: dataAPI.user,
      });
      deleteCookie("user");
      deleteCookie("accessToken");
      localStorage.clear("refreshToken");
    } catch (error) {
      if (error.message === "jwt expired") {
        dispatch(refreshToken(signOutUser()));
      } else {
        dispatch({
          type: GET_USER_FAILED,
          payload: error.message,
        });
      }
    }
  };
}
