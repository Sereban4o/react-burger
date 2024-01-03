import { REQUEST_FORGOT_PASSWORD_API, REQUEST_FORGOT_PASSWORD_API_FAILED, REQUEST_FORGOT_PASSWORD_API_SUCCESS } from "../constants";


export interface IGetForgotPassword {
  readonly type: typeof REQUEST_FORGOT_PASSWORD_API;
}

export interface IGetForgotPasswordSuccess {
  readonly type: typeof REQUEST_FORGOT_PASSWORD_API_SUCCESS;
}

export interface IGetForgotPasswordFailed {
  readonly type: typeof REQUEST_FORGOT_PASSWORD_API_FAILED;
}

export type TForgotPasswordActions =
  | IGetForgotPassword
  | IGetForgotPasswordSuccess
  | IGetForgotPasswordFailed;

export const getForgotPasswordAction = (): IGetForgotPassword => ({
  type: REQUEST_FORGOT_PASSWORD_API
})

export const getForgotPasswordSuccessAction = (): IGetForgotPasswordSuccess => ({
  type: REQUEST_FORGOT_PASSWORD_API_SUCCESS
})

export const getForgotPasswordFailedAction = (): IGetForgotPasswordFailed => ({
  type: REQUEST_FORGOT_PASSWORD_API_FAILED
})