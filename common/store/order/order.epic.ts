import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap} from "rxjs";
import {getRequest} from "@/common/api/core";
import {ORDERS} from "@/common/api/apiRoutes";
import {fetch_order_list, fetchOrderListAction} from "@/common/store/order/order.slice";

const fetchOrderListEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchOrderListAction.type),
    mergeMap(() => from(getRequest(ORDERS)).pipe(
      map(response => {
        if (response.orders) {
          return fetch_order_list(response.orders)
        }
        return fetch_order_list([])
      })
    ))
  )
}

export const orderEpics = combineEpics(fetchOrderListEpic)
