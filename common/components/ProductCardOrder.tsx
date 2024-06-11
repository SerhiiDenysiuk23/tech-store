import React, {useEffect} from 'react';
import {IProduct} from "@/types/IProduct";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {update_product_in_order} from "@/common/store/order/order.slice";

interface Props {
  productToOrder: { product: IProduct, quantity: number }

}

const ProductCardOrder: React.FC<Props> = ({productToOrder}) => {
  const dispatch = useAppDispatch()

  const handleIncrement = () => {
    dispatch(update_product_in_order({...productToOrder, quantity: productToOrder.quantity + 1}))
  }
  const handleDecrement = () => {
    if (productToOrder.quantity <= 0)
      return

    dispatch(update_product_in_order({...productToOrder, quantity: productToOrder.quantity - 1}))
  }

  return (
    <div className={'productCard'}>
      <img src={productToOrder.product.imageUrl} alt={productToOrder.product.name}/>
      <div className={'details'}>
        <h3>{productToOrder.product.name}</h3>
        <p>{productToOrder.product.price * productToOrder.quantity}</p>
        <div className={'quantity'}>
          <button type={"button"} onClick={handleDecrement}>-</button>
          <span>{productToOrder.quantity}</span>
          <button type={"button"} onClick={handleIncrement}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOrder;