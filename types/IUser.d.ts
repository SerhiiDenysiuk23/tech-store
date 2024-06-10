import {Document} from "mongoose";

export interface IUser extends Document {
  email: string;
  phoneNumber?: string;
  password: string;
  isAdmin: boolean;
  name?: string;
  surname?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  postalCode?: string;
  novaPoshtaBranch?: string;
  meestBranch?: string;
}

export interface IRegFails{
  email: string,
  password: string
  repeatPassword: string,
  invalidLogin: string
}

export interface UserState{
  loggedinUser: IUser | null
  currentUser: IUser | null,
  userList: IUser[],
  token: string
  fails: IRegFails
}

export interface IUserToEdit{
  _id: string;
  email: string;
  phoneNumber?: string;
  password: string;
  isAdmin: boolean;
  name?: string;
  surname?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  postalCode?: string;
  novaPoshtaBranch?: string;
  meestBranch?: string;
}