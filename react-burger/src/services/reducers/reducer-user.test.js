import * as types from "../constants/index";
import { userReducer } from "./user";

const initialState = {
  loginRequest: false,
  loginRequestFailed: false,
  logoutRequest: false,
  logoutRequestFailed: false,
  userRequest: false,
  userRequestFailed: false,
  user: undefined,
  isAuthChecked: false,
};

const testUser = {
  email: "test@ya.ru",
  name: "test",
};

describe("counter reducer", () => {
  it("should return the initial state bugrer ingredients", () => {
    expect(userReducer(undefined, {})).toEqual({
      loginRequest: false,
      loginRequestFailed: false,
      logoutRequest: false,
      logoutRequestFailed: false,
      userRequest: false,
      userRequestFailed: false,
      user: undefined,
      isAuthChecked: false,
    });
  });

  it("LOGIN_REQUEST", () => {
    const action = {
      type: types.LOGIN_REQUEST,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: true,
      loginRequestFailed: false,
    });
  });

  it("LOGIN_REQUEST_FAILED", () => {
    const action = {
      type: types.LOGIN_REQUEST_FAILED,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: false,
      loginRequestFailed: true,
      isAuthChecked: true,
    });
  });

  it("LOGIN_REQUEST_SUCCESS", () => {
    const action = {
      type: types.LOGIN_REQUEST_SUCCESS,
      user: testUser,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: false,
      user: action.user,
      isAuthChecked: true,
    });
  });

  it("LOGOUT_REQUEST", () => {
    const action = {
      type: types.LOGOUT_REQUEST,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: true,
      logoutRequestFailed: false,
    });
  });

  it("LOGOUT_REQUEST_FAILED", () => {
    const action = {
      type: types.LOGOUT_REQUEST_FAILED,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequestFailed: true,
      logoutRequest: false,
      isAuthChecked: true,
    });
  });

  it("LOGOUT_REQUEST_SUCCESS", () => {
    const action = {
      type: types.LOGOUT_REQUEST_SUCCESS,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: undefined,
      logoutRequest: false,
      isAuthChecked: true,
    });
  });

  it("USER_REQUEST", () => {
    const action = {
      type: types.USER_REQUEST,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      userRequest: true,
      userRequestFailed: false,
    });
  });

  it("USER_REQUEST_FAILED", () => {
    const action = {
      type: types.USER_REQUEST_FAILED,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      userRequest: false,
      userRequestFailed: true,
      isAuthChecked: true,
    });
  });

  it("USER_REQUEST_SUCCESS", () => {
    const action = {
      type: types.USER_REQUEST_SUCCESS,
      user: testUser,
    };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.user,
      userRequest: false,
      isAuthChecked: true,
    });
  });
});
