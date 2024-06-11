import React, {useEffect, useState} from 'react';
import DeliveryDetails from "@/common/components/DeliveryDetails";
import {useAppSelector} from "@/common/hooks/useAppDispatch";
import ProductCardOrder from "@/common/components/ProductCardOrder";
import {IOrderToCreate} from "@/types/IOrder";
import {postRequest} from "@/common/api/core";
import {CREATE_ORDER} from "@/common/api/apiRoutes";


const orderInit: IOrderToCreate = {
  products: [],
  total: 0,
  deliveryMethod: 'pickup',
  phoneNumber: "",
  recipientName: "",
  recipientSurname: "",
  recipientCity: "",
}


const OrderForm = () => {
  const [order, setOrder] = useState(orderInit)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isProductsEmpty, setIsProductEmpty] = useState(false)

  const {productsToOrder} = useAppSelector(state => state.rootReducer.order)
  const {currentUser} = useAppSelector(state => state.rootReducer.user)


  useEffect(() => {
    if (currentUser)
      setOrder(prevState => ({
        ...prevState,
        recipientName: currentUser.name ?? "",
        recipientSurname: currentUser.surname ?? "",
        recipientCity: currentUser.city ?? "",
        phoneNumber: currentUser.phoneNumber ?? "",
        recipientStreet: currentUser.street,
        recipientApartment: currentUser.apartment,
        recipientHouse: currentUser.house,
        recipientMeestBranch: currentUser.meestBranch,
        recipientNovaPoshtaBranch: currentUser.novaPoshtaBranch,
        recipientPostalCode: currentUser.postalCode,
      }))
  }, []);

  useEffect(() => {
    const total = productsToOrder.reduce((acc, item) => {
      return acc + item.product.price * item.quantity
    }, 0)


    setOrder(
      prevState => ({
        ...prevState,
        products: productsToOrder.map(item => ({product: item.product, quantity: item.quantity})),
        total
      }))
  }, [productsToOrder]);

  const handleDeliveryMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        deliveryMethod: e.target.value as 'pickup' | 'courier' | 'post',
        postalService: undefined
      }))
  };

  const handlePostalServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        postalService: e.target.value as 'nova_poshta' | 'ukrposhta' | 'meest'
      }))
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientName: e.target.value
      }))
  }
  const handleSurNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientSurname: e.target.value
      }))
  }
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        phoneNumber: e.target.value
      }))
  }
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientCity: e.target.value
      }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!order.products.length){
      setIsProductEmpty(true)
      return
    }

    postRequest(CREATE_ORDER, order).then(res => {
      setIsSuccess(res.isSuccess)
    })
  }

  if (isSuccess) {
    return <div style={{textAlign: "center"}} className={"orderForm"}>Success</div>
  }

  return (
    <form onSubmit={handleSubmit} className={'orderForm'}>
      <h2>To order</h2>

      <div className={'products'}>

        {
          !productsToOrder.length &&
          <div className={'productCard'}>
            <div className={`details ${isProductsEmpty ? "error" : ""}`}>
              No Items
            </div>
          </div>
        }

        {productsToOrder.map(item => (
          <ProductCardOrder key={item.product._id as string} productToOrder={item}/>
        ))}
      </div>

      <div className={'formGroup'}>
        <label htmlFor="recipientName">Name</label>
        <input value={order.recipientName} onChange={handleNameChange} type="text" id="recipientName"
               name="recipientName" required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="recipientSurname">Surname</label>
        <input value={order.recipientSurname} onChange={handleSurNameChange} type="text" id="recipientSurname"
               name="recipientSurname" required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="phoneNumber">Phone</label>
        <input value={order.phoneNumber} onChange={handlePhoneNumberChange} type="text" id="phoneNumber"
               name="phoneNumber" required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="recipientCity">City</label>
        <input value={order.recipientCity} onChange={handleCityChange} type="text" id="recipientCity"
               name="recipientCity" required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="deliveryMethod">Delivery method</label>
        <select id="deliveryMethod" name="deliveryMethod" value={order.deliveryMethod}
                onChange={handleDeliveryMethodChange}>
          <option value="pickup">Pickup</option>
          <option value="courier">Courier</option>
          <option value="post">Post</option>
        </select>
      </div>

      {order.deliveryMethod === 'post' && (
        <div className={'formGroup'}>
          <label htmlFor="postalService">Postal service</label>
          <select id="postalService" name="postalService" value={order.postalService}
                  onChange={handlePostalServiceChange}>
            <option value="">Choose postal service</option>
            <option value="nova_poshta">Nova Post</option>
            <option value="ukrposhta">Ukrpost</option>
            <option value="meest">Meest</option>
          </select>
        </div>
      )}

      <DeliveryDetails order={order} setOrder={setOrder}/>

      <div className={'formGroup'}>
        <label htmlFor="total">Total</label>
        <input type="text" id="total" name="total" value={order.total} readOnly/>
      </div>

      <button type="submit">To order</button>
    </form>
  );
};

export default OrderForm;