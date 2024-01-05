import { createAction } from "@reduxjs/toolkit";
import { OrdersActions, TOrderElement } from "../utils/data";

export const connect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT')
export const disconnect = createAction('ORDERS_DISCONNECT')
export const wsConnecting = createAction('ORDERS_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_WS_OPEN');
export const wsClose = createAction('ORDERS_WS_CLOSE');
export const wsMessage = createAction<any, 'ORDERS_WS_MESSAGE'>('ORDERS_WS_MESSAGE');
export const wsError = createAction<string, 'ORDERS_WS_ERROR'>('ORDERS_WS_ERROR');

export const connectUser = createAction<string, 'ORDERS_CONNECT_USER'>('ORDERS_CONNECT_USER')
export const disconnectUser = createAction('ORDERS_DISCONNECT_USER')
export const wsConnectingUser = createAction('ORDERS_WS_CONNECTING_USER');
export const wsOpenUser = createAction('ORDERS_WS_OPEN_USER');
export const wsCloseUser = createAction('ORDERS_WS_CLOSE_USER');
export const wsMessageUser = createAction<any, 'ORDERS_WS_MESSAGE_USER'>('ORDERS_WS_MESSAGE_USER');
export const wsErrorUser = createAction<string, 'ORDERS_WS_ERROR_USER'>('ORDERS_WS_ERROR_USER');

export type TOrdersActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>
    | ReturnType<typeof connectUser>
    | ReturnType<typeof disconnectUser>
    | ReturnType<typeof wsConnectingUser>
    | ReturnType<typeof wsOpenUser>
    | ReturnType<typeof wsCloseUser>
    | ReturnType<typeof wsMessageUser>
    | ReturnType<typeof wsErrorUser>;


