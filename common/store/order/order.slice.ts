import {IOrder, IOrderToCreate, OrderState} from "@/types/IOrder";
import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "@/types/IProduct";

const initialState: OrderState = {
  productsToOrder: [],
  orderList: []
}
const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    fetch_order_list: (state, action: PayloadAction<IOrder[]>) => {
      return {...state, orderList: action.payload}
    },
    set_product_to_order: (state, action: PayloadAction<{ product: IProduct, quantity: number }>) => {
      const existingProductIndex = state.productsToOrder.findIndex(
        item => item.product._id === action.payload.product._id
      );
      if (existingProductIndex !== -1) {
        state.productsToOrder[existingProductIndex].quantity += action.payload.quantity;
      } else {
        return {...state, productsToOrder: [action.payload, ...state.productsToOrder]}
      }
    },
    update_product_in_order: (state, action: PayloadAction<{ product: IProduct, quantity: number }>) => {
      const { product, quantity } = action.payload;
      const index = state.productsToOrder.findIndex(
        item => item.product._id === product._id
      );

      if (index !== -1) {
        if (quantity > 0) {
          state.productsToOrder[index].quantity = quantity;
        } else {
          state.productsToOrder.splice(index, 1);
        }
      }
    }
  }
})

export const fetchOrderListAction = createAction("fetchOrderList");
export default orderSlice;
export const {
  set_product_to_order,
  update_product_in_order,
  fetch_order_list
} = orderSlice.actions