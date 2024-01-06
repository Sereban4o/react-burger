import { GET_ORDER_FAILED_FEED, GET_ORDER_FEED, GET_ORDER_SUCCESS_FEED } from "../constants";
import { TOrderAPI, TOrderElement } from "../utils/data";


export interface IGetOrderFeed {
    readonly type: typeof GET_ORDER_FEED
}

export interface IGetOrderFeedSuccess {
    readonly type: typeof GET_ORDER_SUCCESS_FEED,
    readonly order: Array<TOrderElement>
}

export interface IGetOrderFeedFailed {
    readonly type: typeof GET_ORDER_FAILED_FEED
}


export type TOrderFeedActions =
    | IGetOrderFeed
    | IGetOrderFeedSuccess
    | IGetOrderFeedFailed;

export const getOrderFeedAction = (): IGetOrderFeed => ({
    type: GET_ORDER_FEED
})

export const getOrderFeedSuccessAction = (order: Array<TOrderElement>): IGetOrderFeedSuccess => ({
    type: GET_ORDER_SUCCESS_FEED,
    order
})

export const getOrderFeedFailedAction = (): IGetOrderFeedFailed => ({
    type: GET_ORDER_FAILED_FEED
})