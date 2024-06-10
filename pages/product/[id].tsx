import React, {useEffect} from 'react';
import Footer from "@/common/components/Footer";
import Header from "@/common/components/Header";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {
  fetch_current_product,
  fetchCurrentProductAction,
} from "@/common/store/product/product.slice";
import {fetchCategoryListAction} from "@/common/store/category/category.slice";
import {fetchBrandListAction} from "@/common/store/brand/brand.slice";
import Link from "next/link";
import {set_product_to_order} from "@/common/store/order/order.slice";

const Product = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {currentProduct} = useAppSelector(state => state.rootReducer.product);
  const {currentUser} = useAppSelector(state => state.rootReducer.user);
  const {id} = router.query;

  useEffect(() => {

    if (id && typeof id === 'string') {

      dispatch(fetchCurrentProductAction(id));
    }

    return () => {
      dispatch(fetch_current_product(null));
    };
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchCategoryListAction())
    dispatch(fetchBrandListAction())
  }, []);


  if (!currentProduct)
    return <div>Product not found</div>

  const handleBuy = () => {
    dispatch(set_product_to_order({product: currentProduct, quantity: 1}))
  }

  return (
    <div>
      <Header/>
      <main>
        <section className={'container'}>
          <div className="product-page">
            <img src={currentProduct.imageUrl} alt={currentProduct?.name} className={"product-page__image"}/>

            <h1 className={"product-page__name"}>{currentProduct?.name}</h1>
            <div className={"product-page__brand-category"}>
              <div>
                <b>Brand:</b> {currentProduct.brand.name}
              </div>
              <div>
                <b>Category:</b> {currentProduct.category.name}
              </div>
            </div>

            <div className={"product-page__buy"}>
              <b>{currentProduct.price}</b>
              <Link href={"/order"}>
                <button onClick={handleBuy} className={'buy-button'}>Buy</button>
              </Link>
              <p className={"product-page__stock"}>Stock: {currentProduct.stock}</p>
            </div>

            <p className={"product-page__specific"}><b>Characteristics:</b> {currentProduct.characteristics}</p>
            <p className={"product-page__description"}><b>Description:</b> {currentProduct.description}</p>


          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default Product;