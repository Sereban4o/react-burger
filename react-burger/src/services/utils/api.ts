import { clearIngredientsAction } from "../actions/bugrerIngredients";
import { ingredientsAction, ingredientsFailedAction, ingredientsSuccessAction } from "../actions/ingredients";
import { getOrderAction, getOrderFailedAction, getOrderSuccessAction } from "../actions/order";
import { getForgotPasswordAction, getForgotPasswordFailedAction, getForgotPasswordSuccessAction } from "../actions/resetPassword";
import { getUserAction, getUserFailedAction, getUserSuccessAction } from "../actions/user";
import { refreshToken } from "./auth";
import { TOrderElements, TPassword, TUser } from "./data";
import { getCookie, setCookie } from "./utils";

const BASE_URL = "https://norma.nomoreparties.space/api/";


export const deserializeQuery = (query: string, noQuestionMark = false) => {
    const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
    const array = pairs.map(elem => elem.split('='));
    return Object.fromEntries(array);
};

export const serializeQuery = (queryParams: Record<string, string>) =>
    Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
        if (typeof value === 'undefined') {
            return acc;
        }
        const postfix = index === array.length - 1 ? '' : '&';
        return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
    }, '?');

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
    [key in TDataKey]: TDataType
} & {
    success: boolean;
    message?: string;
    headers?: Headers;
    accessToken: string,
    refreshToken: string,
};

interface CustomBody<T extends any> extends Body {
    json(): Promise<T>;
}

interface CustomResponse<T> extends CustomBody<T> {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: any) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (url: string, options: any) => {
    return fetch(`${BASE_URL}${url}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const saveTokens = (refreshToken: string, accessToken: string) => {
    setCookie("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const refreshTokenRequest = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};



export const loginRequest = async (user: {
    email: string;
    password: string;
}): Promise<CustomResponse<TResponseBody<'user', TUser>>> =>
    await fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',

    });

export const logoutRequest = async (): Promise<CustomResponse<TResponseBody>> =>
    await fetch(`${BASE_URL}auth/logout`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

export function getIngredients() {

    return async function (dispatch: any) {
        dispatch(ingredientsAction());

        try {
            const dataAPI = await request("ingredients", null);

            dispatch(ingredientsSuccessAction(dataAPI.data));
        } catch (error) {
            dispatch(ingredientsFailedAction());
        }
    };
}



export function getForgotPassword(json: JSON) {
    return async function (dispatch: any) {
        dispatch(getForgotPasswordAction());

        try {
            const options = {
                method: "POST",
                body: JSON.stringify(json),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };

            await request("password-reset", options);

            dispatch(getForgotPasswordSuccessAction());
        } catch (error: unknown) {
            let message: string;

            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            } else {
                message = "Неизвестная ошибка"
            }
            dispatch(getForgotPasswordFailedAction());
        }
    };
}

export function getResetPassword(json: TPassword) {
    return async function (dispatch: any) {
        dispatch(getForgotPasswordAction());

        try {
            const options = {
                method: "POST",
                body: JSON.stringify(json),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };
            await request("password-reset/reset", options);

            dispatch(getForgotPasswordSuccessAction());
        } catch (error: unknown) {
            let message: string;

            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            } else {
                message = "Неизвестная ошибка"
            }
            dispatch(getForgotPasswordFailedAction());
        }
    };
}

export function saveUserAPI(user: TUser) {
    return async function (dispatch: any) {
        dispatch(getUserAction());

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

            dispatch(getUserSuccessAction(dataAPI.user));
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
                dispatch(getUserFailedAction());
            }
        }
    };
}

export function getOrder(orderElementsID: TOrderElements) {
    const options = {
        method: "POST",
        body: JSON.stringify(orderElementsID),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: getCookie("accessToken"),
        },
    };

    return async function (dispatch: any) {
        dispatch(getOrderAction());

        try {
            const dataAPI = await request("orders", options);

            dispatch(getOrderSuccessAction(dataAPI.order.number));
            dispatch(clearIngredientsAction());
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
                dispatch(refreshToken(getOrder(orderElementsID)));
            } else {
                dispatch(getOrderFailedAction());
            }
        }
    };
}