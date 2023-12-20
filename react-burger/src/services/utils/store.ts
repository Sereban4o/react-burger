import { configureStore } from '@reduxjs/toolkit'
import { bugrerIngredientsReducer } from '../reducers/bugrerIngredients'
import { ingredientsReducer } from '../reducers/ingredients'
import { modalReducer } from '../reducers/modal'
import { orderReducer } from '../reducers/order'
import { resetPasswordReducer } from '../reducers/resetPassword'
import { userReducer } from '../reducers/user'


export const store = configureStore({
  reducer: {
    bugrerIngredients: bugrerIngredientsReducer,
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer, 
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch