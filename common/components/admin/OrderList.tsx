import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {fetchOrderListAction} from "@/common/store/order/order.slice";
import {IOrder} from "@/types/IOrder";

const OrderList = () => {

  const {orderList: orders} = useAppSelector(state => state.rootReducer.order)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrderListAction())
  }, []);

  return (
    <div className={'orderList'}>
      <h2>Order list</h2>
      {orders.length === 0 ? (
        <p>No orders.</p>
      ) : (
        orders.map(order => (
          <div key={order._id as string} className={'order'}>
            <div className={'orderHeader'}>
              <span>Order #{order._id as string}</span>
              <span className={'status'}>{order.status}</span>
            </div>
            <div className={'orderDetails'}>
              <div className={'recipient'}>
                <p><strong>Recipient:</strong> {order.recipientName} {order.recipientSurname}</p>
                <p><strong>City:</strong> {order.recipientCity}</p>
                <p><strong>Phone number:</strong> {order.phoneNumber}</p>
              </div>
              <div className={'products'}>
                <p><strong>Products:</strong></p>
                {order.products.map((item, index) => (
                  <div key={index} className={'product'}>
                    <p>{item.product.name} x {item.quantity} - {item.product.price} грн</p>
                  </div>
                ))}
              </div>
              <div className={'total'}>
                <p><strong>Total:</strong> {order.total} грн</p>
              </div>
              <div className={"delivery"}>
                <p><strong>Delivery method:</strong> {order.deliveryMethod}</p>
                {order.deliveryMethod === 'post' && (
                  <p><strong>Post Service:</strong> {order.postalService}</p>
                )}
                {order.deliveryMethod === 'post' && order.postalService === 'nova_poshta' && (
                  <p><strong>Nova Post branch:</strong> {order.recipientNovaPoshtaBranch}</p>
                )}
                {order.deliveryMethod === 'post' && order.postalService === 'meest' && (
                  <p><strong>Meest branch:</strong> {order.recipientMeestBranch}</p>
                )}
                {order.deliveryMethod === 'post' && order.postalService === 'ukrposhta' && (
                  <>
                    <p><strong>Street:</strong> {order.recipientStreet}</p>
                    <p><strong>House:</strong> {order.recipientHouse}</p>
                    <p><strong>Apartment:</strong> {order.recipientApartment}</p>
                    <p><strong>Post index:</strong> {order.recipientPostalCode}</p>
                  </>
                )}
                {order.deliveryMethod === 'courier' && (
                  <>
                    <p><strong>Street:</strong> {order.recipientStreet}</p>
                    <p><strong>House:</strong> {order.recipientHouse}</p>
                    <p><strong>Apartment:</strong> {order.recipientApartment}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;