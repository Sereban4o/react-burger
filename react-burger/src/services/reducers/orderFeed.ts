import { TOrderFeedActions } from "../actions/orderFeed";
import { GET_ORDER_FAILED_FEED, GET_ORDER_FEED, GET_ORDER_SUCCESS_FEED } from "../constants";
import { TOrderElement } from "../utils/data";



export type TOrderFeedState = {
    orders: Array<TOrderElement>,
    request: boolean,
    requestFailed: boolean,
};

const initialState: TOrderFeedState = {
    orders: [],
    request: false,
    requestFailed: false,
};

export const orderFeedReducer = (state = initialState, action: TOrderFeedActions): TOrderFeedState => {

    switch (action.type) {
        case GET_ORDER_FEED: {

            return {
                ...state,
                request: true,
            };
        }
        case GET_ORDER_SUCCESS_FEED: {


            return {
                ...state,
                requestFailed: false,
                orders: action.order,
                request: false,
            };
        }
        case GET_ORDER_FAILED_FEED: {

            return { ...state, requestFailed: true, request: false };
        }
        default: {
            return state;
        }
    }
};
