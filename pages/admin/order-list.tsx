import React, {useEffect} from 'react';
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";
import OrderList from "@/common/components/admin/OrderList";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";

const OrderListPage = () => {
  const router = useRouter();
  const {currentUser} = useAppSelector(state => state.rootReducer.user)


  useEffect(() => {
    if (currentUser && currentUser.isAdmin)
      return
    router.push("/")
  }, [currentUser]);



  return (
    <>
      <Header/>
      <main>
        <OrderList/>
      </main>
      <Footer/>
    </>
  );
};

export default OrderListPage;