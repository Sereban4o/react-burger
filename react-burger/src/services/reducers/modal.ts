import { TModalActions } from "../actions/modal";
import { MODAL_FALSE, MODAL_TRUE } from "../constants";


export type TModalState = {
  view: boolean;
};

const modalInitialState: TModalState = {
  view: false,
};

export const modalReducer = (state = modalInitialState, action: TModalActions): TModalState => {
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
}


