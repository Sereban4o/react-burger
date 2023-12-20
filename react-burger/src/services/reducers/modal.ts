import { MODAL_FALSE, MODAL_TRUE } from "../actions/modal";

export type TModalState = {
  view: boolean;
  background:string;
};


const initialState: TModalState = {
  view: false,
  background: "",
};

export const modalReducer = (state = initialState, action: any): TModalState => {
  switch (action.type) {
    case MODAL_TRUE: {
      return { view: true,
              background: 'background' };
    }
    case MODAL_FALSE: {
      return { view: false,
        background: '' };
    }
    default: {
      return state;
    }
  }
};
