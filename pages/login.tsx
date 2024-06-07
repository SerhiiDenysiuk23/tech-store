import LoginForm from "@/common/components/LoginForm";
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";


const LoginPage = () => {
  return (
    <>
      <Header/>
      <main className="form-container">
        <h1>Login</h1>
        <LoginForm/>
      </main>
      <Footer/>

    </>
  );
};

export default LoginPage;
