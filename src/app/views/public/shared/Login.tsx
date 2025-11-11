import React from "react";
import Header from "../../../components/contenedor/Header";
import Footer from "../../../components/contenedor/Footer";
import LoginForm from "../../../components/contenedor/LoginForm";

import "../../../styles/login.css";

export const Login: React.FC = () => {
  return (
    <>
      <Header />
        <LoginForm />
      <Footer />
    </>
  );
};
