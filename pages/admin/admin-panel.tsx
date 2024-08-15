import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useRouter} from 'next/router';
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";
import {getRequest} from "@/common/api/core";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import ManageCategories from "@/common/components/admin/ManageCategories";
import {fetchCategoryListAction} from "@/common/store/category/category.slice";
import {fetchBrandListAction} from "@/common/store/brand/brand.slice";
import ManageBrands from "@/common/components/admin/ManageBrands";
import ManageProducts from "@/common/components/admin/ManageProducts";
import {fetchProductListAction} from "@/common/store/product/product.slice";
import ProductListElem from "@/common/components/ProductListElem";
import ProductListElemEditable from "@/common/components/admin/ProductListElemEditable";

const AddProductPage = () => {
  const router = useRouter();
  const {currentUser} = useAppSelector(state => state.rootReducer.user)
  const dispatch = useAppDispatch()
  const {product, brand, category} = useAppSelector(state => state.rootReducer)

  useEffect(() => {
    if (currentUser && currentUser.isAdmin)
      return
    router.push("/")
  }, [currentUser]);

  useLayoutEffect(() => {
    if (!product.productList.length)
      dispatch(fetchCategoryListAction())

    if (!brand.brandList.length)
      dispatch(fetchBrandListAction())

    if (!category.categoryList.length)
      dispatch(fetchProductListAction())
  }, []);

  return (
    <>
      <Header/>
      <main className={"admin-panel"}>
        <section className={'container'}>
          <div className={"admin-panel__forms"}>
            <ManageProducts/>
            <ManageCategories/>
            <ManageBrands/>
          </div>
        </section>
        <section className="container">
          <div className={"product-grid"}>
            {
              product.productList.map(item => <ProductListElemEditable key={item._id as string} data={item}/>)

            }
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default AddProductPage;
