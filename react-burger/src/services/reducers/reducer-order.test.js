import * as types from "../constants/index";
import { orderReducer } from "./order";

const initialState = {
  order: null,
  request: false,
  requestFailed: false,
};

describe("counter reducer", () => {
  it("should return the initial state bugrer ingredients", () => {
    expect(orderReducer(undefined, {})).toEqual({
      order: null,
      request: false,
      requestFailed: false,
    });
  });

  it("GET_ORDER", () => {
    const action = {
      type: types.GET_ORDER,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("GET_ORDER_SUCCESS", () => {
    const action = {
      type: types.GET_ORDER_SUCCESS,
      order: "12345",
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: false,
      order: action.order,
      request: false,
    });
  });

  it("GET_ORDER_FAILED", () => {
    const action = {
      type: types.GET_ORDER_FAILED,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: true,
      request: false,
    });
  });
});
