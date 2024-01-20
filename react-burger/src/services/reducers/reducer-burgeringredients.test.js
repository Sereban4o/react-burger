import * as types from "../constants/index";
import { bugrerIngredientsReducer } from "./bugrerIngredients";

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

describe("counter reducer", () => {
  it("should return the initial state bugrer ingredients", () => {
    expect(bugrerIngredientsReducer(undefined, {})).toEqual({
      buns: [],
      ingredients: [],
    });
  });

  it("ADD_INGREDIENTS", () => {
    const initialState = {
      buns: [],
      ingredients: [],
    };

    const action = {
      type: types.ADD_INGREDIENTS,
      item: itemTest,
    };

    expect(bugrerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      buns: [action.item],
    });
  });

  it("REMOVE_INGREDIENTS", () => {
    const initialState = {
      buns: [],
      ingredients: [],
    };

    const action = {
      type: types.REMOVE_INGREDIENTS,
      newCards: [itemTest],
    };

    expect(bugrerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: action.newCards,
    });
  });

  it("UPDATE_INGREDIENTS", () => {
    const initialState = {
      buns: [],
      ingredients: [],
    };

    const action = {
      type: types.UPDATE_INGREDIENTS,
      newCards: [itemTest],
    };

    expect(bugrerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: action.newCards,
    });
  });

  it("CLEAR_INGREDIENTS", () => {
    const initialState = {
      buns: [],
      ingredients: [],
    };

    const action = {
      type: types.CLEAR_INGREDIENTS,
    };

    expect(bugrerIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
    });
  });
});
