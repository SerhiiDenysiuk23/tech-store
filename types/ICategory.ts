import {Document} from "mongoose";

export interface ICategory extends Document {
  name: string;
}

export interface CategoryState{
  categoryList: ICategory[]
  fail: string
}