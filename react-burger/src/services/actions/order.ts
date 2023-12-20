import { request } from "../utils/api";
import { TOrderElements } from "../utils/data";
import { getCookie } from "../utils/utils";
import { CLEAR_INGREDIENTS } from "./bugrerIngredients";
import { refreshToken } from "./user";

export const IMPORT_ORDER_API = "IMPORT_ORDER_API";
export const IMPORT_ORDER_API_SUCCESS = "IMPORT_ORDER_API_SUCCESS";
export const IMPORT_ORDER_API_FAILED = "IMPORT_ORDER_API_FAILED";

export function getOrder(orderElementsID: TOrderElements) {
  const options = {
    method: "POST",
    body: JSON.stringify(orderElementsID),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: getCookie("accessToken"),
    },
  };

  return async function (dispatch: any) {
    dispatch({ type: IMPORT_ORDER_API });

    try {
      const dataAPI = await request("orders", options);

      dispatch({
        type: IMPORT_ORDER_API_SUCCESS,
        data: dataAPI.order,
      });
      dispatch({ type: CLEAR_INGREDIENTS });
    } catch (error: unknown) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = "Неизвестная ошибка"
      }
      if (message === "jwt expired") {
        dispatch(refreshToken(getOrder(orderElementsID)));
      } else {
        dispatch({
          type: IMPORT_ORDER_API_FAILED,
          payload: message,
        });
      }
    }
  };
}
