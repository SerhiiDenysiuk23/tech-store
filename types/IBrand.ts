import {Document} from "mongoose";

export interface IBrand extends Document {
  name: string;
}

export interface BrandState{
  brandList: IBrand[]
  fail: string
}