import {
  IMPORT_ORDER_API,
  IMPORT_ORDER_API_FAILED,
  IMPORT_ORDER_API_SUCCESS,
} from "../actions/order";

export type TOrderState = {
  order: any,
  request: boolean,
  requestFailed: boolean,
};

const initialState: TOrderState = {
  order: 0,
  request: false,
  requestFailed: false,
};

export const orderReducer = (state = initialState, action: any): TOrderState => {
  switch (action.type) {
    case IMPORT_ORDER_API: {
      return {
        ...state,
        request: true,
      };
    }
    case IMPORT_ORDER_API_SUCCESS: {
      return {
        ...state,
        requestFailed: false,
        order: action.data,
        request: false,
      };
    }
    case IMPORT_ORDER_API_FAILED: {
      return { ...state, requestFailed: true, request: false };
    }
    default: {
      return state;
    }
  }
};
