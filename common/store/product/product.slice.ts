import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct, IProductToCreate, ProductState} from "@/types/IProduct";


const initialState: ProductState = {
  productList: [],
  currentProduct: null,
  fail: ""
}

const productSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    fetch_product_list: (state, action: PayloadAction<IProduct[]>) => {
      return {...state, productList: action.payload}
    },
    fetch_current_product: (state, action: PayloadAction<IProduct | null>) => {
      return {...state, currentProduct: action.payload}
    },
    set_fail_product: (state, action: PayloadAction<string>) => {
      return {...state, fail: action.payload}
    },
    create_product: (state, action: PayloadAction<IProduct>) => {
      return {...state, productList: [action.payload,...state.productList]}
    }
  }
})

export const fetchProductListAction = createAction("fetchProductList");
export const fetchCurrentProductAction = createAction<string>("fetchCurrentProduct");
export const createProductAction = createAction<IProductToCreate>("createProduct");
export default productSlice;
export const {
  fetch_product_list,
  set_fail_product,
  create_product,
  fetch_current_product
} = productSlice.actions
