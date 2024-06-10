import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRegFails, IUser, IUserToEdit, UserState} from "@/types/IUser";


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
export const editUserAction = createAction<IUserToEdit>("editUser");
export default userSlice;
export const {
  fetch_current_user,
  set_fails_user,
  set_token
} = userSlice.actions