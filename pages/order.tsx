import React from 'react';
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";
import OrderForm from "@/common/components/OrderForm";

const Order = () => {
  return (
    <>
      <Header/>
      <main>
        <OrderForm/>
      </main>
      <Footer/>
    </>
  );
};

export default Order;