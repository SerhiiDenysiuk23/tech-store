import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BrandState, IBrand} from "@/types/IBrand";


const initialState: BrandState = {
  brandList: [],
  fail: ""
}
const brandSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    fetch_brand_list: (state, action: PayloadAction<IBrand[]>) => {
      return {...state, brandList: action.payload}
    },
    create_brand: (state, action: PayloadAction<IBrand>) => {
      return {...state, brandList: [action.payload, ...state.brandList]}
    },
    set_fail_brand: (state, action: PayloadAction<string>) => {
      return {...state, fail: action.payload}
    },
    edit_brand: (state, action: PayloadAction<IBrand>) => {
      return {
        ...state,
        brandList: state.brandList.map(item => item._id == action.payload._id ? {...item, ...action.payload} : item)
      }
    },
    delete_brand: (state, action: PayloadAction<string>) => {
      return {...state, brandList: state.brandList.filter(item => item._id != action.payload)}
    },
  }
})

export const fetchBrandListAction = createAction("fetchBrandList");
export const createBrandAction = createAction<string>("createBrand");
export const editBrandAction = createAction<{ _id: string, name: string }>("editBrand");
export const deleteBrandAction = createAction<string>("deleteBrand");
export default brandSlice;
export const {
  fetch_brand_list,
  create_brand,
  set_fail_brand,
  edit_brand,
  delete_brand
} = brandSlice.actions