import React from "react";
import { Link } from "react-router-dom";
import "../../styles/internalError.css"; // Estilos personalizados

export const InternalError = () => {
  return (
    <div className="error500-container">
      <div className="error500-content">
        <h1 className="error500-title">500</h1>
        <p className="error500-subtitle">¡Error interno del servidor!</p>
        <p className="error500-text">
          Algo salió mal en nuestro sistema ⚡.  
          No es tu culpa, estamos trabajando en solucionarlo.
        </p>

        <Link to="/dash" className="error500-btn">
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
};