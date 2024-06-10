import React from 'react';
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";
import UserForm from "@/common/components/UserForm";

const UserPage = () => {
  return (
    <>
      <Header/>
      <main>
        <UserForm/>
      </main>
      <Footer/>
    </>
  );
};

export default UserPage;