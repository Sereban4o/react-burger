import { modalReducer } from "./modal";
import * as types from "../constants/index";

describe("counter reducer", () => {
  it("should return the initial state modal", () => {
    expect(modalReducer(undefined, {})).toEqual({
      view: false,
    });
  });

  it("MODAL_TRUE", () => {
    expect(
      modalReducer(
        {},
        {
          type: types.MODAL_TRUE,
          view: true,
        }
      )
    ).toEqual({
      view: true,
    });
  });
  it("MODAL_FALSE", () => {
    expect(
      modalReducer(
        {},
        {
          type: types.MODAL_FALSE,
          view: false,
        }
      )
    ).toEqual({
      view: false,
    });
  });
});
