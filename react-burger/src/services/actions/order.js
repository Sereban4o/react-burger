import { getRequest } from "../utils/api";
import { urlOrder } from "../utils/apiAdress";

export const IMPORT_ORDER_API = "IMPORT_ORDER_API";
export const IMPORT_ORDER_API_SUCCESS = "IMPORT_ORDER_API_SUCCESS";
export const IMPORT_ORDER_API_FAILED = "IMPORT_ORDER_API_FAILED";

export function getOrder(orderElementsID) {
  const post = {
    method: "POST",
    body: JSON.stringify(orderElementsID),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  return function (dispatch) {
    dispatch({
      type: IMPORT_ORDER_API,
    });

    getRequest(urlOrder, post).then((res) => {
      if (res && res.success) {
        dispatch({
          type: IMPORT_ORDER_API_SUCCESS,
          data: res.order,
        });
      } else {
        dispatch({
          type: IMPORT_ORDER_API_FAILED,
        });
      }
    });
  };
}
