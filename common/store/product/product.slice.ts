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
    edit_product: (state, action: PayloadAction<IProduct>) => {
      return {
        ...state,
        productList: state.productList.map(item => item._id == action.payload._id ? {...item, ...action.payload} : item)
      }
    },
    delete_product: (state, action: PayloadAction<string>) => {
      return {...state, productList: state.productList.filter(item => item._id != action.payload)}
    },
    set_fail_product: (state, action: PayloadAction<string>) => {
      return {...state, fail: action.payload}
    },
    create_product: (state, action: PayloadAction<IProduct>) => {
      return {...state, productList: [action.payload, ...state.productList]}
    }
  }
})

export const fetchProductListAction = createAction("fetchProductList");
export const fetchCurrentProductAction = createAction<string>("fetchCurrentProduct");
export const createProductAction = createAction<IProductToCreate>("createProduct");
export const editProductAction = createAction<IProductToCreate>("editProduct");
export const deleteProductAction = createAction<string>("deleteProduct");

export default productSlice;
export const {
  fetch_product_list,
  set_fail_product,
  create_product,
  fetch_current_product,
  delete_product,
  edit_product
} = productSlice.actions
