import { MODAL_FALSE, MODAL_TRUE } from "../actions/modal";

export type TModalState = {
  view: boolean;
};


const initialState: TModalState = {
  view: false,
};

export const modalReducer = (state = initialState, action: any): TModalState => {
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
