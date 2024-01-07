import { ThunkAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { TUserActions } from '../actions/user'
import { TModalActions } from '../actions/modal'
import { TBugrerIngredientsActions } from '../actions/bugrerIngredients'
import { TIngredientsActions } from '../actions/ingredients'
import { TForgotPasswordActions } from '../actions/resetPassword'
import { TOrderActions } from '../actions/order'
import { connect, disconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage, TOrdersActions } from '../actions/orders'
import { createSocketMiddleware } from '../middleware/socketMiddleware'

import { rootReducer } from '../reducers'
import { TOrderFeedActions } from '../actions/orderFeed'



const wsActions = {
    connect: connect,
    disconnect: disconnect,
    wsConnecting: wsConnecting,
    wsOpen: wsOpen,
    wsClose: wsClose,
    wsError: wsError,
    wsMessage: wsMessage,
};
const webSocketMiddleware: any = createSocketMiddleware(wsActions);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(webSocketMiddleware)
    }
})


export type TActions =
    | TUserActions
    | TModalActions
    | TBugrerIngredientsActions
    | TIngredientsActions
    | TForgotPasswordActions
    | TOrderActions
    | TOrdersActions
    | TOrderFeedActions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, TActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TActions>;

