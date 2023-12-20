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
    dragId: string;
    index: number;
  };

export type TPassword =  {
  password: string,
  token: string,
}; 

  export type TUser ={
    name: string,
    email: string,
    password?: string,
    
  };

  export type TLoginUser ={
    email: string,
    password?: string,
  };

  export type TAuth = {
    user:  TUser,
    isAuthChecked: boolean,
    getUser(): void,
    saveUser(): void,
    signIn(): void,
    signOut(): void,
    forgotPassword(): void,
    resetPassword(): void,
  };

  export type TItem={
    item: TIngredients;
  };
 export type TModalProps = {
    onClick: any;
    children:  ReactPortal | ReactNode;
  };

  export type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: JSX.Element;
  };

  export type TAction={
    type: string;
    item?: TIngredients; 
  }

 export type TOrderElements={
  ingredients:Array<String>;
 }