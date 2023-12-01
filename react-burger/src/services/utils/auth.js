import { useContext, createContext } from "react";
import { deleteCookie, getCookie, setCookie } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithRefresh } from "./api";
import { ADD_USER, REMOVE_USER, UPDATE_USER } from "../actions/user";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();

  const signIn = async (user) => {
    const post = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const data = await fetchWithRefresh("auth/login", post)
      .then((res) => {
        let authToken;

        authToken = res.accessToken.split("Bearer ")[1];

        if (authToken) {
          setCookie("token", authToken);
        }
        return res;
      })
      .then((data) => data);

    if (data.success) {
      dispatch({
        type: ADD_USER,
        user: data.user,
      });
    }
  };

  const signOut = async () => {
    const post = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    };

    return fetchWithRefresh("auth/logout", post).then((res) => {
      dispatch({
        type: REMOVE_USER,
      });
      deleteCookie("token");
    });
  };

  const saveUser = async (user) => {
    const post = {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + getCookie("token"),
      },
    };

    const data = await fetchWithRefresh("auth/user", post).then((res) => {
      if (res.success) {
        dispatch({
          type: UPDATE_USER,
          user: res.user,
        });
      }
    });
  };

  const { user } = useSelector((state) => state.user);

  return {
    user,
    saveUser,
    signIn,
    signOut,
  };
}
