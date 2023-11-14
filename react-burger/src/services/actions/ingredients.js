import { getRequest } from "../utils/api";
import { urlIngredients } from "../utils/apiAdress";

export const IMPORT_API = "IMPORT_API";
export const IMPORT_API_SUCCESS = "IMPORT_API_SUCCESS";
export const IMPORT_API_FAILED = "IMPORT_API_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: IMPORT_API,
    });

    getRequest(urlIngredients).then((res) => {
      if (res && res.success) {
        dispatch({
          type: IMPORT_API_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: IMPORT_API_FAILED,
        });
      }
    });
  };
}
