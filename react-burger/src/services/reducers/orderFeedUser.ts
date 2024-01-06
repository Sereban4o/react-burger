import { TOrderFeedActions } from "../actions/orderFeed";
import { TOrderFeedUserActions } from "../actions/orderFeedUser";
import { GET_ORDER_FAILED_FEED, GET_ORDER_FAILED_FEED_USER, GET_ORDER_FEED, GET_ORDER_FEED_USER, GET_ORDER_SUCCESS_FEED, GET_ORDER_SUCCESS_FEED_USER } from "../constants";
import { TOrderElement } from "../utils/data";



export type TOrderFeedUserState = {
    orders: Array<TOrderElement>,
    request: boolean,
    requestFailed: boolean,
};

const initialState: TOrderFeedUserState = {
    orders: [],
    request: false,
    requestFailed: false,
};

export const orderFeedUserReducer = (state = initialState, action: TOrderFeedUserActions): TOrderFeedUserState => {

    switch (action.type) {
        case GET_ORDER_FEED_USER: {

            return {
                ...state,
                request: true,
            };
        }
        case GET_ORDER_SUCCESS_FEED_USER: {


            return {
                ...state,
                requestFailed: false,
                orders: action.order,
                request: false,
            };
        }
        case GET_ORDER_FAILED_FEED_USER: {

            return { ...state, requestFailed: true, request: false };
        }
        default: {
            return state;
        }
    }
};
