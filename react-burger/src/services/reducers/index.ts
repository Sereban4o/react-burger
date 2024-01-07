import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { bugrerIngredientsReducer } from "./bugrerIngredients";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { modalReducer } from "./modal";
import { resetPasswordReducer } from "./resetPassword";
import { ordersReducer } from "./orders";
import { orderFeedReducer } from "./orderFeed";



export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    bugrerIngredients: bugrerIngredientsReducer,
    order: orderReducer,
    user: userReducer,
    modal: modalReducer,
    resetPassword: resetPasswordReducer,
    orders: ordersReducer,
    orderFeed: orderFeedReducer,
});
