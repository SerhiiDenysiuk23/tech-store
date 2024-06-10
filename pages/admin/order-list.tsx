import React from 'react';
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";
import OrderList from "@/common/components/admin/OrderList";

const OrderListPage = () => {
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