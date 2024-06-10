import {from, map, mergeMap} from "rxjs";
import {combineEpics, Epic, ofType} from "redux-observable";
import {getRequest, postRequest} from "@/common/api/core";

import {
  create_product,
  createProductAction, fetch_current_product,
  fetch_product_list, fetchCurrentProductAction, fetchProductListAction,
  set_fail_product
} from "@/common/store/product/product.slice";
import {CREATE_PRODUCT, GET_PRODUCT, GET_PRODUCT_LIST} from "@/common/api/apiRoutes";


const fetchProductListEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchProductListAction.type),
    mergeMap(() => from(getRequest(GET_PRODUCT_LIST)).pipe(
      map(response => {
        if (response.products) {
          return fetch_product_list(response.products)
        }
        return fetch_product_list([])
      })
    ))
  )
}

const fetchCurrentProductEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchCurrentProductAction.type),
    mergeMap((action: any) => from(getRequest(GET_PRODUCT(action.payload))).pipe(
      map(response => {
        if (response.product) {
          return fetch_current_product(response.product)
        }
        return set_fail_product(response.message)
      })
    ))
  )
}

const createProductEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(createProductAction.type),
    mergeMap((action: any) => from(postRequest(CREATE_PRODUCT, action.payload)).pipe(
      map(response => {

        if (response.message)
          return set_fail_product(response.message)

        return create_product(response.product)
      })
    ))
  )
}

export const productEpics = combineEpics(fetchProductListEpic, createProductEpic, fetchCurrentProductEpic)
