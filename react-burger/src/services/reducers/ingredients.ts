
import { TIngredientsActions } from "../actions/ingredients";
import { INGREDIENTS_REQUEST, INGREDIENTS_REQUEST_FAILED, INGREDIENTS_REQUEST_SUCCESS } from "../constants";
import { TIngredients } from "../utils/data";

export type TIngredientsState = {
    dataApi: ReadonlyArray<TIngredients>;
    bun: ReadonlyArray<TIngredients>;
    main: ReadonlyArray<TIngredients>;
    sauce: ReadonlyArray<TIngredients>;
    request: boolean;
    requestFailed: boolean;
};

const ingredientsInitialState: TIngredientsState = {
    dataApi: [],
    bun: [],
    main: [],
    sauce: [],
    request: false,
    requestFailed: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
            return {
                ...state,
                request: true,
            };
        }
        case INGREDIENTS_REQUEST_SUCCESS: {
            return {
                ...state,
                requestFailed: false,
                dataApi: action.data,
                bun: action.data.filter((item) => item.type === "bun"),
                main: action.data.filter((item) => item.type === "main"),
                sauce: action.data.filter((item) => item.type === "sauce"),
                request: false,
            };
        }
        case INGREDIENTS_REQUEST_FAILED: {
            return { ...state, requestFailed: true, request: false };
        }
        default: {
            return state;
        }
    }
};
