import {from, map, mergeMap} from "rxjs";
import {combineEpics, Epic, ofType} from "redux-observable";
import {getRequest, postRequest} from "@/common/api/core";
import {
  create_category,
  createCategoryAction, delete_category, deleteCategoryAction, edit_category, editCategoryAction,
  fetch_category_list,
  fetchCategoryListAction, set_fail_category
} from "@/common/store/category/category.slice";
import {CATEGORIES} from "@/common/api/apiRoutes";


const fetchCategoryListEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchCategoryListAction.type),
    mergeMap(() => from(getRequest(CATEGORIES)).pipe(
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
    mergeMap((action: any) => from(postRequest(CATEGORIES, action.payload)).pipe(
      map(response => {

        if (response.message)
          return set_fail_category(response.message)

        return create_category(response.category)
      })
    ))
  )
}
const editCategoryEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(editCategoryAction.type),
    mergeMap((action: any) => from(postRequest(CATEGORIES, action.payload, 'PUT')).pipe(
      map(response => {

        if (response.message)
          return set_fail_category(response.message)

        return edit_category(response.category)
      })
    ))
  )
}

const deleteCategoryEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(deleteCategoryAction.type),
    mergeMap((action: any) => from(postRequest(CATEGORIES, action.payload, "DELETE")).pipe(
      map(response => {
        if (response.isDeleted) {
          return delete_category(action.payload)
        }
        return set_fail_category(response.message)
      })
    ))
  )
}

export const categoryEpics = combineEpics(
  fetchCategoryListEpic,
  createCategoryEpic,
  editCategoryEpic,
  deleteCategoryEpic
)