import {
  IMPORT_API,
  IMPORT_API_FAILED,
  IMPORT_API_SUCCESS,
} from "../actions/ingredients";

const initialState = {
  dataApi: [],
  bun: [],
  main: [],
  sauce: [],
  request: false,
  requestFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_API: {
      return {
        ...state,
        request: true,
      };
    }
    case IMPORT_API_SUCCESS: {
      return {
        ...state,
        requestFailed: false,
        dataApi: action.data,
        bun: action.data.filter((dataType) => dataType.type === "bun"),
        main: action.data.filter((dataType) => dataType.type === "main"),
        sauce: action.data.filter((dataType) => dataType.type === "sauce"),
        request: false,
      };
    }
    case IMPORT_API_FAILED: {
      return { ...state, requestFailed: true, request: false };
    }
    default: {
      return state;
    }
  }
};
