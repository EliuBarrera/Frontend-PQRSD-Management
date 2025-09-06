import React from "react";
import Header from "../../../components/contenedor/Header";
import Footer from "../../../components/contenedor/Footer";
import LoginForm from "../../../components/contenedor/LoginForm";

import "../../../styles/login.css";

const LoginAdmin: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default LoginAdmin;
