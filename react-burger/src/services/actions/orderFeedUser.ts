import { GET_ORDER_FAILED_FEED_USER, GET_ORDER_FEED_USER, GET_ORDER_SUCCESS_FEED_USER } from "../constants";
import { TOrderElement } from "../utils/data";


export interface IGetOrderFeedUser {
    readonly type: typeof GET_ORDER_FEED_USER
}

export interface IGetOrderFeedUserSuccess {
    readonly type: typeof GET_ORDER_SUCCESS_FEED_USER,
    readonly order: Array<TOrderElement>
}

export interface IGetOrderFeedUserFailed {
    readonly type: typeof GET_ORDER_FAILED_FEED_USER
}


export type TOrderFeedUserActions =
    | IGetOrderFeedUser
    | IGetOrderFeedUserSuccess
    | IGetOrderFeedUserFailed;

export const getOrderFeedUserAction = (): IGetOrderFeedUser => ({
    type: GET_ORDER_FEED_USER
})

export const getOrderFeedUserSuccessAction = (order: Array<TOrderElement>): IGetOrderFeedUserSuccess => ({
    type: GET_ORDER_SUCCESS_FEED_USER,
    order
})

export const getOrderFeedUserFailedAction = (): IGetOrderFeedUserFailed => ({
    type: GET_ORDER_FAILED_FEED_USER
})