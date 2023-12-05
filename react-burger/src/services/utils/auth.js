import { useNavigate } from "react-router-dom";
import { getForgotPassword, getResetPassword } from "../actions/resetPassword";
import {
  getUserAPI,
  saveUserAPI,
  signInAPI,
  signOutAPI,
} from "../actions/user";
import { deleteCookie, setCookie } from "./utils";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (user) => {
    dispatch(signInAPI(user));
  };

  const signOut = async () => {
    dispatch(signOutAPI(user));
  };

  const getUser = async () => {
    dispatch(getUserAPI());
  };

  const saveUser = async (user) => {
    dispatch(saveUserAPI(user));
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

  const { user, isAuthChecked } = useSelector((state) => state.user);

  return {
    user,
    isAuthChecked,
    getUser,
    saveUser,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
  };
}
