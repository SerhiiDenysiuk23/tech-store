import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap} from "rxjs";
import {getRequest} from "@/common/api/core";
import {GET_ORDER_LIST} from "@/common/api/apiRoutes";
import {fetch_order_list, fetchOrderListAction} from "@/common/store/order/order.slice";

const fetchOrderListEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(fetchOrderListAction.type),
    mergeMap(() => from(getRequest(GET_ORDER_LIST)).pipe(
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
