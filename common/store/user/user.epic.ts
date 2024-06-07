import {
  createUserAction,
  fetch_current_user,
  fetchTokenAction,
  fetchCurrentUserAction,
  initialFails,
  set_fails_user,
  set_token
} from "@/common/store/user/user.slice";
import {from, map, mergeMap, Observable} from "rxjs";
import {combineEpics, Epic, ofType} from "redux-observable";
import {getRequest, postRequest, setCookie, TOKEN_NAME} from "@/common/api/core";
import {GET_USER, GET_USER_BY_TOKEN, LOGIN, REGISTER} from "@/common/api/apiRoutes";


const fetchCurrentUserEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchCurrentUserAction.type),
    mergeMap(() => from(getRequest(GET_USER_BY_TOKEN)).pipe(
      map(response => {
        if (response.user){
          return fetch_current_user(response.user)
        }
        return fetch_current_user(null)
      })
    ))
  )
}

const fetchTokenEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchTokenAction.type),
    mergeMap((action: any) => from(postRequest(LOGIN, action.payload)).pipe(
      map(response => {

        if (response.message)
          return set_fails_user({...initialFails, invalidLogin: response.message})

        const token = response?.token
        if (token){
          setCookie(TOKEN_NAME, token, 2)
          return set_token(token)
        }
      })
    ))
  )
}

const CreateUserEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(createUserAction.type),
    mergeMap((action: any) => from(postRequest(REGISTER, action.payload)).pipe(
      map(response => {

        if (response.message)
          return set_fails_user({...initialFails, email: response.message})

        const user = response?.user
        if (user){
          return fetchTokenAction({email: user.email, password: user.password})
        }
      })
    ))
  )
}

export const userEpics = combineEpics(fetchCurrentUserEpic, fetchTokenEpic, CreateUserEpic)