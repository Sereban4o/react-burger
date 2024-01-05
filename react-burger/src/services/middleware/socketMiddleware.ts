import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit"
import { RootState } from "../utils/store"
import { TOrdersActions } from "../actions/orders"
import { OrdersActions } from "../utils/data"

export type TwsActionTypes = {
    connect: ActionCreatorWithPayload<string>,
    disconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
    wsMessage: ActionCreatorWithPayload<OrdersActions>,
    connectUser: ActionCreatorWithPayload<string>,
    disconnectUser: ActionCreatorWithoutPayload,
    wsConnectingUser: ActionCreatorWithoutPayload,
    wsOpenUser: ActionCreatorWithoutPayload,
    wsCloseUser: ActionCreatorWithoutPayload,
    wsErrorUser: ActionCreatorWithPayload<string>,
    wsMessageUser: ActionCreatorWithPayload<OrdersActions>,
}


export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null
        let url = ''
        let isConnected = false
        let reconnectedTimerId = 0

        let socketUser: WebSocket | null = null
        let urlUser = ''
        let isConnectedUser = false
        let reconnectedTimerIdUser = 0

        return (next) => (action: TOrdersActions) => {
            const { dispatch } = store
            const {
                connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen, connectUser, disconnectUser, wsCloseUser, wsConnectingUser, wsErrorUser, wsMessageUser, wsOpenUser,
            } = wsActions

            if (connect.match(action)) {
                url = action.payload
                socket = new WebSocket(url)
                isConnected = true
                reconnectedTimerId = 0
                dispatch(wsConnecting())

            }

            if (connectUser.match(action)) {
                urlUser = action.payload
                socketUser = new WebSocket(urlUser)
                isConnectedUser = true
                reconnectedTimerIdUser = 0
                dispatch(wsConnectingUser())
            }

            if (socket && wsConnecting.match(action)) {
                socket.onopen = () => {

                    dispatch(wsOpen())
                }

                socket.onerror = () => {
                    dispatch(wsError('Websocket error'))
                }

                socket.onmessage = (event: MessageEvent) => {

                    const { data } = event
                    try {
                        const parsedData: OrdersActions = JSON.parse(data)

                        dispatch(wsMessage(parsedData))
                    } catch (err) {
                        console.error(err)
                        dispatch(wsError('Incorrect data'))
                    }
                }

                socket.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {

                        dispatch(wsError(`Error: ${event.code}`))
                    }
                    if (isConnected) {
                        reconnectedTimerId = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 3000)
                    }

                    dispatch(wsClose())
                }
            }

            if (socketUser && wsConnectingUser.match(action)) {
                socketUser.onopen = () => {

                    dispatch(wsOpenUser())
                }

                socketUser.onerror = () => {
                    dispatch(wsErrorUser('Websocket error'))
                }

                socketUser.onmessage = (event: MessageEvent) => {

                    const { data } = event
                    try {
                        const parsedData: OrdersActions = JSON.parse(data)

                        dispatch(wsMessageUser(parsedData))
                    } catch (err) {
                        console.error(err)
                        dispatch(wsErrorUser('Incorrect data'))
                    }
                }

                socketUser.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {

                        dispatch(wsErrorUser(`Error: ${event.code}`))
                    }
                    if (isConnectedUser) {
                        reconnectedTimerIdUser = window.setTimeout(() => {
                            dispatch(connectUser(url))
                        }, 3000)
                    }

                    dispatch(wsCloseUser())
                }
            }

            if (socket && disconnect.match(action)) {
                isConnected = false
                window.clearTimeout(reconnectedTimerId)
                reconnectedTimerId = 0
                socket.close()
            }

            if (socketUser && disconnectUser.match(action)) {
                isConnectedUser = false
                window.clearTimeout(reconnectedTimerIdUser)
                reconnectedTimerIdUser = 0
                socketUser.close()
            }

            next(action)
        }
    }
}