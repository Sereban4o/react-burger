import { ReactNode, ReactPortal } from "react";

export type TIngredients = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    dragId?: string;
    index?: number;
};

export type TPassword = {
    password: string,
    token: string,
};

export type TUser = {
    readonly password?: string;
    readonly email: string;
    readonly name: string;


};


export type TLoginUser = {
    email: string,
    password?: string,
};

export type TAuth = {
    user: TUser,
    isAuthChecked: boolean,
    getUser(): void,
    saveUser(): void,
    signIn(): void,
    signOut(): void,
    forgotPassword(): void,
    resetPassword(): void,
};

export type TItem = {
    item: TIngredients;
};
export type TModalProps = {
    onClick: any;
    children: ReactPortal | ReactNode;
};

export type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: JSX.Element;
};

export type TAction = {
    type: string;
    item?: TIngredients;
}

export type TOrderElements = {
    ingredients: Array<String>;
}

export interface IMessageResponse {
    message: string;
    success: boolean;
    username: string;

    id?: string;
    isBot?: boolean;
}


export interface IMessage extends Omit<IMessageResponse, 'success'> {
    timestamp: number;
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface TableRow {
    id: number;
    text: string;
}

export type Orders = Array<TableRow>;

export enum OrdersActionType {
    DATA = 'data',
    INSERT = 'insert',
    DELETE = 'delete',
    UPDATE = 'update',
    MOVE = 'move',
}

export type Data = {
    type: OrdersActionType.DATA,
    data: Orders
}

export type Insert = {
    type: OrdersActionType.INSERT,
    data: {
        rows: Array<TableRow>,
        pos: number
    }
}

export type Update = {
    type: OrdersActionType.UPDATE,
    data: Orders
}

export type Delete = {
    type: OrdersActionType.DELETE,
    data: Array<number>
}

export type Move = {
    type: OrdersActionType.MOVE,
    data: Array<{ from: number, to: number }>
}

export type OrdersAction = Insert | Data | Delete | Update | Move;

export type OrdersActions = Array<OrdersAction>;