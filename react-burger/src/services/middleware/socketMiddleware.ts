import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit"
import { RootState } from "../utils/store"
import { TOrdersActions } from "../actions/orders"

export type TwsActionTypes = {
    connect: ActionCreatorWithPayload<string>,
    disconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
    wsMessage: ActionCreatorWithPayload<any>,
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
                connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen,
            } = wsActions

            if (connect.match(action)) {
                // console.log('Websocket connecting')
                url = action.payload
                socket = new WebSocket(url)
                isConnected = true
                reconnectedTimerId = 0
                dispatch(wsConnecting())
            }

            if (socket && wsConnecting.match(action)) {
                socket.onopen = () => {
                    // console.log('open')
                    dispatch(wsOpen())
                }

                socket.onerror = () => {
                    dispatch(wsError('Websocket error'))
                }

                socket.onmessage = (event: MessageEvent) => {
                    //  console.log(event.data);
                    const { data } = event
                    try {
                        const parsedData: any = JSON.parse(data)
                        //console.log(parsedData);
                        dispatch(wsMessage(parsedData))
                    } catch (err) {
                        console.error(err)
                        dispatch(wsError('Incorrect data'))
                    }
                }

                socket.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {
                        //   console.error('Connection error')
                        dispatch(wsError(`Error: ${event.code}`))
                    }
                    if (isConnected) {
                        reconnectedTimerId = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 3000)
                    }
                    // console.log('Connection closed')
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