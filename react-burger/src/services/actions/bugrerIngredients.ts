import { ADD_INGREDIENTS, CLEAR_INGREDIENTS, REMOVE_INGREDIENTS, UPDATE_INGREDIENTS } from "../constants"
import { TIngredients } from "../utils/data"

export interface IAddIngredientsAction {
    readonly type: typeof ADD_INGREDIENTS,
    readonly item: TIngredients
}

export interface IRemoveIngredientsAction {
    readonly type: typeof REMOVE_INGREDIENTS,
    readonly newCards: ReadonlyArray<TIngredients>

}

export interface IUpdateIngredientsAction {
    readonly type: typeof UPDATE_INGREDIENTS,
    readonly newCards: ReadonlyArray<TIngredients>
}

export interface IClearIngredientsAction {
    readonly type: typeof CLEAR_INGREDIENTS
}

export type TBugrerIngredientsActions =
    | IAddIngredientsAction
    | IRemoveIngredientsAction
    | IUpdateIngredientsAction
    | IClearIngredientsAction;

export const addIngredientsAction = (item: TIngredients): IAddIngredientsAction => ({
    type: ADD_INGREDIENTS,
    item

})

export const removeIngredientsAction = (newCards: ReadonlyArray<TIngredients>): IRemoveIngredientsAction => ({
    type: REMOVE_INGREDIENTS,
    newCards
})

export const updateIngredientsAction = (newCards: ReadonlyArray<TIngredients>): IUpdateIngredientsAction => ({
    type: UPDATE_INGREDIENTS,
    newCards
})

export const clearIngredientsAction = (): IClearIngredientsAction => ({
    type: CLEAR_INGREDIENTS
})