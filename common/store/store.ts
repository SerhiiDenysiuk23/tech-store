import {combineReducers} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/common/store/user/user.slice";
import {userEpics} from "@/common/store/user/user.epic";
import categorySlice from "@/common/store/category/category.slice";
import {categoryEpics} from "@/common/store/category/category.epic";
import {brandEpics} from "@/common/store/brand/brand.epic";
import brandSlice from "@/common/store/brand/brand.slice";
import productSlice from "@/common/store/product/product.slice";
import {productEpics} from "@/common/store/product/product.epic";

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(
  userEpics,
  categoryEpics,
  brandEpics,
  productEpics
);

const rootReducer = combineReducers({
  user: userSlice.reducer,
  category: categorySlice.reducer,
  brand: brandSlice.reducer,
  product: productSlice.reducer
})

export const store = configureStore({
  reducer: {
    rootReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware)
});

epicMiddleware.run(rootEpic)

export const dispatchOut = store.dispatch;
export const state = store.getState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;