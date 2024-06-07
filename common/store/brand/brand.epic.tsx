import {from, map, mergeMap} from "rxjs";
import {combineEpics, Epic, ofType} from "redux-observable";
import {getRequest, postRequest} from "@/common/api/core";
import {CREATE_BRAND, GET_BRAND_LIST} from "@/common/api/apiRoutes";
import {
  create_brand,
  createBrandAction,
  fetch_brand_list,
  fetchBrandListAction,
  set_fail_brand
} from "@/common/store/brand/brand.slice";


const fetchBrandListEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchBrandListAction.type),
    mergeMap(() => from(getRequest(GET_BRAND_LIST)).pipe(
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
    mergeMap((action: any) => from(postRequest(CREATE_BRAND, action.payload)).pipe(
      map(response => {
        if (response.message)
          return set_fail_brand(response.message)


        return create_brand(response.brand)

      })
    ))
  )
}

export const brandEpics = combineEpics(fetchBrandListEpic, createBrandEpic)