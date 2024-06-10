import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {fetchOrderListAction} from "@/common/store/order/order.slice";

const OrderList = () => {

  const {orderList: orders} = useAppSelector(state => state.rootReducer.order)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrderListAction())
  }, []);

  return (
    <div className={'orderList'}>
      <h2>Список заказов</h2>
      {orders.length === 0 ? (
        <p>Заказы отсутствуют.</p>
      ) : (
        orders.map(order => (
          <div key={order._id as string} className={'order'}>
            <div className={'orderHeader'}>
              <span>Заказ #{order._id as string}</span>
              <span className={'status'}>{order.status}</span>
            </div>
            <div className={'orderDetails'}>
              <div className={'recipient'}>
                <p><strong>Получатель:</strong> {order.recipientName} {order.recipientSurname}</p>
                <p><strong>Город:</strong> {order.recipientCity}</p>
                <p><strong>Телефон:</strong> {order.phoneNumber}</p>
              </div>
              <div className={'products'}>
                <p><strong>Продукты:</strong></p>
                {order.products.map((item, index) => (
                  <div key={index} className={'product'}>
                    <p>{item.product.name} x {item.quantity} - {item.product.price} грн</p>
                  </div>
                ))}
              </div>
              <div className={'total'}>
                <p><strong>Итого:</strong> {order.total} грн</p>
              </div>
              <div className={"delivery"}>
                <p><strong>Метод доставки:</strong> {order.deliveryMethod}</p>
                {order.deliveryMethod === 'post' && (
                  <p><strong>Почтовая служба:</strong> {order.postalService}</p>
                )}
                {order.deliveryMethod === 'post' && order.postalService === 'nova_poshta' && (
                  <p><strong>Отделение Новой Почты:</strong> {order.recipientNovaPoshtaBranch}</p>
                )}
                {order.deliveryMethod === 'post' && order.postalService === 'meest' && (
                  <p><strong>Отделение Meest:</strong> {order.recipientMeestBranch}</p>
                )}
                {order.deliveryMethod === 'post' && order.postalService === 'ukrposhta' && (
                  <>
                    <p><strong>Улица:</strong> {order.recipientStreet}</p>
                    <p><strong>Дом:</strong> {order.recipientHouse}</p>
                    <p><strong>Квартира:</strong> {order.recipientApartment}</p>
                    <p><strong>Почтовый индекс:</strong> {order.recipientPostalCode}</p>
                  </>
                )}
                {order.deliveryMethod === 'courier' && (
                  <>
                    <p><strong>Улица:</strong> {order.recipientStreet}</p>
                    <p><strong>Дом:</strong> {order.recipientHouse}</p>
                    <p><strong>Квартира:</strong> {order.recipientApartment}</p>
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