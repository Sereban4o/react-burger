import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "../constants";

export interface IGetOrder {
  readonly type: typeof GET_ORDER
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS,
  readonly order: number
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED
}


export type TOrderActions =
  | IGetOrder
  | IGetOrderSuccess
  | IGetOrderFailed;

export const getOrderAction = (): IGetOrder => ({
  type: GET_ORDER
})

export const getOrderSuccessAction = (order: number): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  order
})

export const getOrderFailedAction = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED
})