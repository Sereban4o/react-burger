import {
  ADD_INGREDIENTS,
  REMOVE_INGREDIENTS,
  UPDATE_INGREDIENTS,
} from "../actions/bugrerIngredients";

const initialState = {
  buns: [],
  ingredients: [],
};

export const bugrerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS: {
      if (action.item.type === "bun") {
        return {
          ...state,
          buns: [action.item],
        };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.item],
        };
      }
    }
    case REMOVE_INGREDIENTS: {
      return { ...state, ingredients: action.newCards };
    }
    case UPDATE_INGREDIENTS: {
      return { ...state, ingredients: action.newCards };
    }

    default: {
      return state;
    }
  }
};
