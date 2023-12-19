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
    email: string,
    password?: string,
    name: string,
  };

  export type TLoginUser ={
    email: string,
    password?: string,
  };

  export type TAuth = {
    user: null | TUser,
    isAuthChecked: boolean,
    getUser(): void,
    saveUser(): void,
    signIn(): void,
    signOut(): void,
    forgotPassword(): void,
    resetPassword(): void,
  };

