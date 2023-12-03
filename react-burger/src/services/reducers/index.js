import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { bugrerIngredientsReducer } from "./bugrerIngredients";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { modalReducer } from "./modal";
import { resetPasswordReducer } from "./resetPassword";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bugrerIngredients: bugrerIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  modal: modalReducer,
  resetPassword: resetPasswordReducer,
});
