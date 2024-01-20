import {
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "../actions/orders";

import { WebsocketStatus } from "../utils/data";
import { ordersReducer } from "./orders";

const orderTest = {
  _id: "65abd1a287899c001b82a1b3",
  status: "done",
  name: "Флюоресцентный бургер",
  createdAt: "2024-01-20T13:58:58.203Z",
  updatedAt: "2024-01-20T13:58:58.705Z",
  number: 32178,
};

const initialState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  ordersInfo: undefined,
};

describe("counter reducer", () => {
  it("should return the initial state bugrer ingredients", () => {
    expect(ordersReducer(undefined, {})).toEqual({
      status: WebsocketStatus.OFFLINE,
      connectionError: "",
      ordersInfo: undefined,
    });
  });

  it("wsConnecting", () => {
    const action = {
      type: wsConnecting,
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("wsOpen", () => {
    const action = {
      type: wsOpen,
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("wsClose", () => {
    const action = {
      type: wsClose,
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("wsError", () => {
    const action = {
      type: wsError,
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      connectionError: action.payload,
    });
  });

  it("wsMessage", () => {
    const action = {
      type: wsMessage,
      payload: [orderTest],
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      ordersInfo: action.payload,
    });
  });
});
