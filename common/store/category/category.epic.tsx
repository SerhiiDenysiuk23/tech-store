import {from, map, mergeMap, Observable} from "rxjs";
import {combineEpics, Epic, ofType} from "redux-observable";
import {getRequest, postRequest, setCookie, TOKEN_NAME} from "@/common/api/core";
import {
  create_category,
  createCategoryAction,
  fetch_category_list,
  fetchCategoryListAction, set_fail_category
} from "@/common/store/category/category.slice";
import {CREATE_CATEGORY, GET_CATEGORY_LIST} from "@/common/api/apiRoutes";


const fetchCategoryListEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchCategoryListAction.type),
    mergeMap(() => from(getRequest(GET_CATEGORY_LIST)).pipe(
      map(response => {
        if (response.categories) {
          return fetch_category_list(response.categories)
        }
        return fetch_category_list([])
      })
    ))
  )
}

const createCategoryEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(createCategoryAction.type),
    mergeMap((action: any) => from(postRequest(CREATE_CATEGORY, action.payload)).pipe(
      map(response => {

        if (response.message)
          return set_fail_category(response.message)

        return create_category(response.category)
      })
    ))
  )
}

export const categoryEpics = combineEpics(fetchCategoryListEpic, createCategoryEpic)