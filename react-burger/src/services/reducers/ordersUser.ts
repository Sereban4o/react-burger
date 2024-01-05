import { createReducer } from "@reduxjs/toolkit";
import { TOrderAPI, WebsocketStatus } from "../utils/data";
import { wsCloseUser, wsConnectingUser, wsErrorUser, wsMessageUser, wsOpenUser } from "../actions/orders";


export type OrdersUsersStore = {
    status: WebsocketStatus;
    connectionError: string;
    ordersUser: TOrderAPI | undefined;

}

export const initialStore: OrdersUsersStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    ordersUser: undefined,

}

export const ordersUserReducer = createReducer(initialStore, (builder) => {
    builder
        .addCase(wsConnectingUser, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsOpenUser, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsCloseUser, (state) => {
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(wsErrorUser, (state, action) => {
            state.connectionError = action.payload
        })
        .addCase(wsMessageUser, (state, action) => {

            state.ordersUser = action.payload;
        })

})
