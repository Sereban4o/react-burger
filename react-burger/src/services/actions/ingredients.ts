import { INGREDIENTS_REQUEST, INGREDIENTS_REQUEST_FAILED, INGREDIENTS_REQUEST_SUCCESS } from "../constants";
import { TIngredients } from "../utils/data";


export interface IIngredientsRequestAction {
  readonly type: typeof INGREDIENTS_REQUEST;

}

export interface IIngredientsRequestSuccessAction {
  readonly type: typeof INGREDIENTS_REQUEST_SUCCESS;
  readonly data: ReadonlyArray<TIngredients>;
}

export interface IIngredientsRequestFailedAction {
  readonly type: typeof INGREDIENTS_REQUEST_FAILED;
}

export type TIngredientsActions =
  | IIngredientsRequestAction
  | IIngredientsRequestSuccessAction
  | IIngredientsRequestFailedAction;

export const ingredientsAction = (): IIngredientsRequestAction => ({
  type: INGREDIENTS_REQUEST
})

export const ingredientsSuccessAction = (data: ReadonlyArray<TIngredients>): IIngredientsRequestSuccessAction => ({
  type: INGREDIENTS_REQUEST_SUCCESS,
  data
})

export const ingredientsFailedAction = (): IIngredientsRequestFailedAction => ({
  type: INGREDIENTS_REQUEST_FAILED
})