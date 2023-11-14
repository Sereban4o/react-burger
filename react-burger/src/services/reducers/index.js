import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { bugrerIngredientsReducer } from "./bugrerIngredients";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bugrerIngredients: bugrerIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
});
