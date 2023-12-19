import { TBugrerIngredientsState } from '../reducers/bugrerIngredients';
import { TIngredientsState } from '../reducers/ingredients';
import { TModalState } from '../reducers/modal';
import { TOrderState } from '../reducers/order';
import { TUserState } from '../reducers/user';


export type RootState = {
  modal: TModalState;
  bugrerIngredients: TBugrerIngredientsState;
  user: TUserState;
  ingredients: TIngredientsState
  order: TOrderState
};