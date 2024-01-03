import { MODAL_FALSE, MODAL_TRUE } from "../constants";


export interface IModalTrue {
    readonly type: typeof MODAL_TRUE;
}

export interface IModalFalse {
    readonly type: typeof MODAL_FALSE;
}

export type TModalActions =
    | IModalFalse
    | IModalTrue;

export const modalTrueAction = (): IModalTrue => ({
    type: MODAL_TRUE
});

export const modalFalseAction = (): IModalFalse => ({
    type: MODAL_FALSE
});
