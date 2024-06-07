import Head from "next/head";
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";
import ProductListElem from "@/common/components/admin/ProductListElem";
import React, {useEffect, useLayoutEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {fetchCategoryListAction} from "@/common/store/category/category.slice";
import {fetchBrandListAction} from "@/common/store/brand/brand.slice";
import {fetchProductListAction} from "@/common/store/product/product.slice";

export default function Home() {
  const {product} = useAppSelector(state => state.rootReducer)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(fetchCategoryListAction())
    dispatch(fetchBrandListAction())
    dispatch(fetchProductListAction())
  }, []);

  return (
    <>
      <Head>
        <title>Tech Store</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header/>
      <main className={"container"}>
        <div className={"product-grid"}>
          {
            product.productList.map(item => <ProductListElem key={item._id as string} product={item}/>)

          }
        </div>
      </main>
      <Footer/>
    </>
  );
}
