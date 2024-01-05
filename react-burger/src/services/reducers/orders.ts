import { createReducer } from "@reduxjs/toolkit";
import { TOrderAPI, WebsocketStatus } from "../utils/data";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/orders";



export type OrdersStore = {
    status: WebsocketStatus;
    connectionError: string;
    ordersInfo: TOrderAPI | undefined;

}

export const initialStore: OrdersStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    ordersInfo: undefined,

}

export const ordersReducer = createReducer(initialStore, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload
        })
        .addCase(wsMessage, (state, action) => {
            state.ordersInfo = action.payload;
        })

})
