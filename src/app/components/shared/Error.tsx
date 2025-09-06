import React from "react";
import { Link } from "react-router-dom";
import "../../styles/notFound.css"; // Estilos personalizados

export const Error = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">¡Ups! Página no encontrada</p>
        <p className="notfound-text">
          Parece que te perdiste en el camino 🚧.  
          No te preocupes, te ayudamos a volver.
        </p>

        <Link to="/dash" className="notfound-btn">
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
};
