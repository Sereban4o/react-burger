import { request } from "../utils/api";

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

  return async function (dispatch) {
    dispatch({ type: IMPORT_ORDER_API });

    try {
      const dataAPI = await request("orders", post);

      dispatch({
        type: IMPORT_ORDER_API_SUCCESS,
        data: dataAPI.order,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: IMPORT_ORDER_API_FAILED });
    }
  };
}
