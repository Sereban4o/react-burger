import { ADD_USER, REMOVE_USER, UPDATE_USER } from "../actions/user";

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return { ...state, user: action.user };
    }
    case REMOVE_USER: {
      return initialState;
    }
    case UPDATE_USER: {
      return { user: action.user };
    }
    default: {
      return state;
    }
  }
};
