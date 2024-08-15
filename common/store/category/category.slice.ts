import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoryState, ICategory} from "@/types/ICategory";

const initialState: CategoryState = {
  categoryList: [],
  fail: ""
}
const categorySlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    fetch_category_list: (state, action: PayloadAction<ICategory[]>) => {
      return {...state, categoryList: action.payload}
    },
    create_category: (state, action: PayloadAction<ICategory>) => {
      return {...state, categoryList: [action.payload, ...state.categoryList]}
    },
    edit_category: (state, action: PayloadAction<ICategory>) => {
      return {
        ...state,
        categoryList: state.categoryList.map(item => item._id == action.payload._id ? {...item, ...action.payload} : item)
      }
    },
    delete_category: (state, action: PayloadAction<string>) => {
      return {...state, categoryList: state.categoryList.filter(item => item._id != action.payload)}
    },
    set_fail_category: (state, action: PayloadAction<string>) => {
      return {...state, fail: action.payload}
    }
  }
})

export const fetchCategoryListAction = createAction("fetchCategoryList");
export const createCategoryAction = createAction<string>("createCategory");
export const editCategoryAction = createAction<{_id: string, name: string}>("editCategory");
export const deleteCategoryAction = createAction<string>("deleteCategory");
export default categorySlice;
export const {
  fetch_category_list,
  create_category,
  set_fail_category,
  edit_category,
  delete_category
} = categorySlice.actions