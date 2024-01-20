import * as types from "../constants/index";
import { ingredientsReducer } from "./ingredients";

const itemTest = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

const initialState = {
  dataApi: [],
  bun: [],
  main: [],
  sauce: [],
  request: false,
  requestFailed: false,
};

describe("counter reducer", () => {
  it("should return the initial state bugrer ingredients", () => {
    expect(ingredientsReducer(undefined, {})).toEqual({
      dataApi: [],
      bun: [],
      main: [],
      sauce: [],
      request: false,
      requestFailed: false,
    });
  });

  it("INGREDIENTS_REQUEST", () => {
    const action = {
      type: types.INGREDIENTS_REQUEST,
    };

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("INGREDIENTS_REQUEST_SUCCESS", () => {
    const action = {
      type: types.INGREDIENTS_REQUEST_SUCCESS,
      data: [itemTest],
    };

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: false,
      dataApi: action.data,
      bun: action.data.filter((item) => item.type === "bun"),
      main: action.data.filter((item) => item.type === "main"),
      sauce: action.data.filter((item) => item.type === "sauce"),
      request: false,
    });
  });

  it("INGREDIENTS_REQUEST_FAILED", () => {
    const action = {
      type: types.INGREDIENTS_REQUEST_FAILED,
    };

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      requestFailed: true,
      request: false,
    });
  });
});
