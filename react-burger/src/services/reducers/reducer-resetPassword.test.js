import * as types from "../constants/index";
import { resetPasswordReducer } from "./resetPassword";

const initialState = {
  request: false,
  requestFailed: false,
};

describe("counter reducer", () => {
  it("should return the initial state bugrer ingredients", () => {
    expect(resetPasswordReducer(undefined, {})).toEqual({
      request: false,
      requestFailed: false,
    });
  });

  it("REQUEST_FORGOT_PASSWORD_API", () => {
    const action = {
      type: types.REQUEST_FORGOT_PASSWORD_API,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("REQUEST_FORGOT_PASSWORD_API_SUCCESS", () => {
    const action = {
      type: types.REQUEST_FORGOT_PASSWORD_API_SUCCESS,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: false,
      request: false,
    });
  });

  it("REQUEST_FORGOT_PASSWORD_API_FAILED", () => {
    const action = {
      type: types.REQUEST_FORGOT_PASSWORD_API_FAILED,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: true,
      request: false,
    });
  });
});
