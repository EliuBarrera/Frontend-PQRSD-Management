import React from "react";
import Header from "../contenedor/Header";
import Card from "../contenedor/Card";
import Footer from "../contenedor/Footer";
import { RuteoInterno } from "../../routes/RuteoInterno";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="container">
          <header>
            <h1>IDEAPRO</h1>
            <p>Sistema Integral de Gestión</p>
          </header>

          <div className="content">
            <Card
              type="admin"
              title="ADMINISTRADOR"
              icon="👨‍💼"
              description="Acceso al panel de administración del sistema con funcionalidades completas de gestión y configuración."
              buttonText="Ingresar"
              link="loginAdmin"
            />
            <Card
              type="funcionario"
              title="FUNCIONARIO"
              icon="👨‍💻"
              description="Acceso al panel de funcionario para gestionar trámites, consultas y atención al usuario."
              buttonText="Ingresar"
              link="login.html"
            />
            <Card
              type="pqrsd"
              title="REGISTRAR PQRSD"
              icon="📝"
              description="Registrar Peticiones, Quejas, Reclamos, Sugerencias y Denuncias para seguimiento y resolución."
              buttonText="Registrar"
              link="registrarPQRSD.html"
            />
          </div>
        </div>
        <div className="conatiner-fluid content-inner mt-n5 py-0">
          <RuteoInterno />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
