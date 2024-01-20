import * as types from "../constants/index";
import { orderFeedReducer } from "./orderFeed";

const orderTest = {
  _id: "65abd1a287899c001b82a1b3",
  status: "done",
  name: "Флюоресцентный бургер",
  createdAt: "2024-01-20T13:58:58.203Z",
  updatedAt: "2024-01-20T13:58:58.705Z",
  number: 32178,
};

const initialState = {
  orders: [],
  request: false,
  requestFailed: false,
};

describe("counter reducer", () => {
  it("should return the initial state bugrer ingredients", () => {
    expect(orderFeedReducer(undefined, {})).toEqual({
      orders: [],
      request: false,
      requestFailed: false,
    });
  });

  it("GET_ORDER_FEED", () => {
    const action = {
      type: types.GET_ORDER_FEED,
    };

    expect(orderFeedReducer(initialState, action)).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("GET_ORDER_SUCCESS_FEED", () => {
    const action = {
      type: types.GET_ORDER_SUCCESS_FEED,
      order: [orderTest],
    };

    expect(orderFeedReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: false,
      orders: action.order,
      request: false,
    });
  });

  it("GET_ORDER_FAILED_FEED", () => {
    const action = {
      type: types.GET_ORDER_FAILED_FEED,
    };

    expect(orderFeedReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: true,
      request: false,
    });
  });
});
