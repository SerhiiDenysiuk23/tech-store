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
import ProductListElem from "@/common/components/admin/ProductListElem";

const AddProductPage = () => {
  const router = useRouter();
  const {currentUser} = useAppSelector(state => state.rootReducer.user)
  const dispatch = useAppDispatch()
  const {product} = useAppSelector(state => state.rootReducer)


  useEffect(() => {
    if (currentUser && currentUser.isAdmin)
      return
    router.push("/")
  }, [currentUser]);

  useLayoutEffect(() => {
    dispatch(fetchCategoryListAction())
    dispatch(fetchBrandListAction())
    dispatch(fetchProductListAction())
  }, []);

  return (
    <>
      <Header/>
      <main className={"admin-panel"}>
        <div className={"admin-panel__forms"}>
          <ManageProducts/>
          <ManageCategories/>
          <ManageBrands/>
        </div>
        <div className={"product-grid"}>
          {
            product.productList.map(item => <ProductListElem key={item._id as string} product={item} isShowAll={true}/>)

          }
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default AddProductPage;
