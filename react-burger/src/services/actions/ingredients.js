import { getRequest } from "../utils/api";
import { urlIngredients } from "../utils/apiAdress";

export const IMPORT_API = "IMPORT_API";
export const IMPORT_API_SUCCESS = "IMPORT_API_SUCCESS";
export const IMPORT_API_FAILED = "IMPORT_API_FAILED";

export function getIngredients() {
  return async function (dispatch) {
    dispatch({ type: IMPORT_API });

    try {
      const dataAPI = await getRequest(urlIngredients);

      dispatch({
        type: IMPORT_API_SUCCESS,
        data: dataAPI.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: IMPORT_API_FAILED });
    }
  };
}
