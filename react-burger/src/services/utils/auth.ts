import { useNavigate } from "react-router-dom";
import { getForgotPassword, getResetPassword } from "../actions/resetPassword";
import {
  getUserAPI,
  saveUserAPI,
  signInAPI,
  signOutAPI,
} from "../actions/user";
import { deleteCookie, setCookie } from "./utils";

import { TLoginUser, TPassword, TUser } from "../../services/utils/data";
import { useAppDispatch, useAppSelector } from "./hooks";



export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const signIn = async (user: TLoginUser) => {
    dispatch(signInAPI(user));
  };

  const signOut = async () => {
    dispatch(signOutAPI());
  };

  const getUser = async () => {
    dispatch(getUserAPI());
  };

  const saveUser = async (user: TUser) => {
    dispatch(saveUserAPI(user));
  };

  const forgotPassword = async (json: any, randomString: string) => {
    setCookie("tokenPassword", randomString, null);
    dispatch(getForgotPassword(json));
  };

  const resetPassword = async (json: TPassword) => {
    dispatch(getResetPassword(json));
    deleteCookie("tokenPassword");
    navigate("/");
  };

  const { user, isAuthChecked } = useAppSelector((state) => state.user);

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
