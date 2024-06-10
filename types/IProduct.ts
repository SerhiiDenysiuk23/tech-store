import {Types, Document} from "mongoose";
import {ICategory} from "@/types/ICategory";
import {IBrand} from "@/types/IBrand";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: ICategory;
  brand: IBrand;
  characteristics: string;
  stock: number;
  imageUrl: string;
}

export interface ProductState{
  productList: IProduct[],
  currentProduct: IProduct | null,
  fail: string
}

export interface IProductToCreate {
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  characteristics: string;
  stock: number;
  imageUrl: string;
}
