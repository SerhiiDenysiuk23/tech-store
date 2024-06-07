import RegisterForm from '@/common/components/RegisterForm';
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";

const RegisterPage = () => {
  return (
    <>
      <Header/>
      <main className="form-container">
        <h1>Register</h1>
        <RegisterForm/>
      </main>
      <Footer/>
    </>
  );
};

export default RegisterPage;