import { useNavigate } from "react-router-dom";
import { getForgotPassword, getResetPassword } from "../actions/resetPassword";
import { getUser, signOutUser } from "../actions/user";
import { deleteCookie, getCookie, setCookie } from "./utils";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (user, url = "auth/login") => {
    // console.log(user);
    dispatch(getUser(user, url, "POST"));
  };

  const signOut = async () => {
    dispatch(signOutUser(user));
  };

  const saveUser = async (user, url) => {
    dispatch(getUser(user, url, "PATCH"));

    const json = { email: user.email, password: user.password };
    dispatch(getUser(json, "auth/login", "POST"));
  };

  const forgotPassword = async (json, randomString) => {
    setCookie("tokenPassword", randomString);
    dispatch(getForgotPassword(json));
  };

  const resetPassword = async (json) => {
    dispatch(getResetPassword(json));
    deleteCookie("tokenPassword");
    navigate("/");
  };

  const { user } = useSelector((state) => state.user);

  return {
    user,
    saveUser,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
  };
}
