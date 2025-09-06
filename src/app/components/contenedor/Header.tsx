import React from "react";

const Header: React.FC = () => {
  return (
   <div className="top-header">
      <nav className="top-nav">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="idea">IDEA</span>
          <span className="pro">PRO</span>
        </div>

        <ul className="nav-menu">
          <li><a href="#" className="active"> Inicio</a></li>
          <li><a href="https://ideapro.com.co/servicios/">Servicios</a></li>
          <li><a href="https://ideapro.com.co/experiencias/">Experiencias</a></li>
          <li><a href="https://ideapro.com.co/novedades/">Novededes</a></li>
          <li><a href="https://ideapro.com.co/contactanos/" className="contact-btn">Contáctanos</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
