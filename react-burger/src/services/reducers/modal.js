import { MODAL_FALSE, MODAL_TRUE } from "../actions/modal";

const initialState = {
  view: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_TRUE: {
      return { view: true };
    }
    case MODAL_FALSE: {
      return { view: false };
    }
    default: {
      return state;
    }
  }
};
