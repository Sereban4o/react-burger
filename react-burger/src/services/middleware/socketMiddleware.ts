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

}


export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null
        let url = ''
        let isConnected = false
        let reconnectedTimerId = 0


        return (next) => (action: TOrdersActions) => {
            const { dispatch } = store
            const {
                connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen
            } = wsActions

            if (connect.match(action)) {
                url = action.payload
                socket = new WebSocket(url)
                isConnected = true
                reconnectedTimerId = 0
                dispatch(wsConnecting())

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

            if (socket && disconnect.match(action)) {
                isConnected = false
                window.clearTimeout(reconnectedTimerId)
                reconnectedTimerId = 0
                socket.close()
            }

            next(action)
        }
    }
}