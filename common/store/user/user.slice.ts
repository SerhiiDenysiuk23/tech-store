import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRegFails, IUser, UserState} from "@/types/IUser";


export const initialFails: IRegFails = {email: "", password: "", repeatPassword: "", invalidLogin: ""}

const initialState: UserState = {
  currentUser: null,
  loggedinUser: null,
  userList: [],
  fails: initialFails,
  token: ""
}
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    fetch_current_user: (state, action: PayloadAction<IUser | null>) => {
      return {...state, currentUser: action.payload}
    },
    fetch_userList: (state, action: PayloadAction<IUser[]>) => {
      return {...state, userList: action.payload}
    },
    delete_user: (state, action: PayloadAction<IUser>) => {
      return {...state, userList: state.userList.filter(item => item != action.payload)}
    },
    set_fails_user: (state, action: PayloadAction<IRegFails>) => {
      return {...state, fails: action.payload}
    },
    set_token: (state, action: PayloadAction<string>) => {
      return {...state, token: action.payload}
    }
  }
})

export const fetchCurrentUserAction = createAction("fetchCurrentUser");
export const fetchTokenAction = createAction<{email: string, password: string}>("fetchToken");
export const createUserAction = createAction<{email: string, password: string}>("createUser");
export const fetchUserListAction = createAction("fetchUserList");
export const deleteUserAction = createAction<IUser>("deleteUser");
export default userSlice;
export const {
  fetch_current_user,
  fetch_userList,
  delete_user,
  set_fails_user,
  set_token
} = userSlice.actions