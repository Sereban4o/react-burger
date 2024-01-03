import { TOrderActions } from "../actions/order";
import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "../constants";


export type TOrderState = {
  order: number | null,
  request: boolean,
  requestFailed: boolean,
};

const initialState: TOrderState = {
  order: null,
  request: false,
  requestFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        request: true,
      };
    }
    case GET_ORDER_SUCCESS: {

      return {
        ...state,
        requestFailed: false,
        order: action.order,
        request: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, requestFailed: true, request: false };
    }
    default: {
      return state;
    }
  }
};
