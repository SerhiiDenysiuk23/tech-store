import {from, map, mergeMap} from "rxjs";
import {combineEpics, Epic, ofType} from "redux-observable";
import {getRequest, postRequest} from "@/common/api/core";
import {BRANDS} from "@/common/api/apiRoutes";
import {
  create_brand,
  createBrandAction, delete_brand, deleteBrandAction, edit_brand, editBrandAction,
  fetch_brand_list,
  fetchBrandListAction,
  set_fail_brand
} from "@/common/store/brand/brand.slice";


const fetchBrandListEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchBrandListAction.type),
    mergeMap(() => from(getRequest(BRANDS)).pipe(
      map(response => {
        if (response.brands) {
          return fetch_brand_list(response.brands)
        }
        return fetch_brand_list([])
      })
    ))
  )
}

const createBrandEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(createBrandAction.type),
    mergeMap((action: any) => from(postRequest(BRANDS, action.payload)).pipe(
      map(response => {
        if (response.message)
          return set_fail_brand(response.message)


        return create_brand(response.brand)

      })
    ))
  )
}

const editBrandEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(editBrandAction.type),
    mergeMap((action: any) => from(postRequest(BRANDS, action.payload, 'PUT')).pipe(
      map(response => {

        if (response.message)
          return set_fail_brand(response.message)

        return edit_brand(response.brand)
      })
    ))
  )
}

const deleteBrandEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(deleteBrandAction.type),
    mergeMap((action: any) => from(postRequest(BRANDS, action.payload, "DELETE")).pipe(
      map(response => {
        if (response.isDeleted) {
          return delete_brand(action.payload)
        }
        return set_fail_brand(response.message)
      })
    ))
  )
}

export const brandEpics = combineEpics(
  fetchBrandListEpic,
  createBrandEpic,
  editBrandEpic,
  deleteBrandEpic
  )