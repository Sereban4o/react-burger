
import {
    getUserAction,
    getUserFailedAction,
    getUserSuccessAction,
    loginAction,
    loginFailedAction,
    loginSuccessAction,
    logoutAction,
    logoutFailedAction,
    logoutSuccessAction,
} from "../actions/user";
import { deleteCookie, getCookie, setCookie } from "./utils";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getForgotPassword, getResetPassword, loginRequest, refreshTokenRequest, registerRequest, request, saveTokens, saveUserAPI } from "./api";
import { TLoginUser, TPassword, TUser } from "./data";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "./store";


export const refreshToken = (afterRefresh: any) => (dispatch: AppDispatch) => {
    refreshTokenRequest().then((res) => {
        saveTokens(res.refreshToken, res.accessToken.split('Bearer ')[1]);
        dispatch(afterRefresh);
    });
};

export function useAuth() {
    const { user, userRequest, isAuthChecked } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const signIn = async (user: { email: string; password: string }) => {
        dispatch(loginAction());
        await loginRequest(user)
            .then(res => {
                if (res.ok) { return res.json(); }
                dispatch(loginFailedAction());
                return Promise.reject(`Ошибка ${res.status}`);

            })
            .then(res => {
                if (res.success) {
                    saveTokens(res.refreshToken, res.accessToken.split('Bearer ')[1]);
                    dispatch(loginSuccessAction({ ...res.user }));
                }
            })
            .catch(error => {

                dispatch(loginFailedAction());

            });

    };

    const register = async (user: { email: string; password: string; name: string }) => {
        dispatch(loginAction());
        await registerRequest(user)
            .then(res => {
                if (res.ok) { return res.json(); }
                dispatch(loginFailedAction());
                return Promise.reject(`Ошибка ${res.status}`);

            })
            .then(res => {
                if (res.success) {
                    saveTokens(res.refreshToken, res.accessToken.split('Bearer ')[1]);
                    dispatch(loginSuccessAction({ ...res.user }));
                }
            })
            .catch(error => {

                dispatch(loginFailedAction());

            });

    };

    const getUser = async () => {
        dispatch(getUserAction());
        try {
            const options = {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: 'Bearer ' + getCookie("accessToken"),
                },
            };

            const dataAPI = await request("auth/user", options);

            dispatch(getUserSuccessAction({ ...dataAPI.user }));
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
                dispatch(refreshToken(getUser()));
            } else {
                dispatch(getUserFailedAction());
            }
        }
    };

    const signOut = async () => {
        dispatch(logoutAction());

        const options = {
            method: "POST",
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };

        try {
            const dataAPI = await request("auth/logout", options);

            dispatch(logoutSuccessAction());
            deleteCookie('accessToken');
            localStorage.removeItem("refreshToken");
        } catch (error) {
            dispatch(logoutFailedAction());
        }

    };

    const saveUser = async (user: TUser) => {
        dispatch(saveUserAPI(user));
    };

    const forgotPassword = async (json: TLoginUser, randomString: string) => {
        setCookie("tokenPassword", randomString);
        dispatch(getForgotPassword(json));
    };

    const resetPassword = async (json: TPassword) => {
        dispatch(getResetPassword(json));
        deleteCookie("tokenPassword");
        navigate("/");
    };


    return {
        user,
        userRequest,
        isAuthChecked,
        getUser,
        signIn,
        signOut,
        forgotPassword,
        resetPassword,
        saveUser,
        register
    };
}
