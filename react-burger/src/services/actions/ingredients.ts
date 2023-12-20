import { request } from "../utils/api";

export const IMPORT_API = "IMPORT_API";
export const IMPORT_API_SUCCESS = "IMPORT_API_SUCCESS";
export const IMPORT_API_FAILED = "IMPORT_API_FAILED";

export function getIngredients() {
  
  return async function (dispatch: any) {
    dispatch({ type: IMPORT_API });

    try {
      const dataAPI = await request("ingredients", null);

      dispatch({
        type: IMPORT_API_SUCCESS,
        data: dataAPI.data,
      });
    } catch (error) {
      dispatch({ type: IMPORT_API_FAILED });
    }
  };
}
