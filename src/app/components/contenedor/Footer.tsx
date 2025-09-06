import React from "react";
import LogoBlanco from "../../../assets/LogoBlanco.jpeg"; // 👈 importa la imagen

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Logo + texto */}
          <div className="footer-logo-section">
            <div className="footer-logo">
              {/* ✅ usa la variable LogoBlanco */}
              <img src={LogoBlanco} alt="Logo IdeaPro" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">
              Sistema integral de gestión de peticiones
            </p>
          </div>

          {/* Navegación */}
          <div className="footer-nav">
            <div className="footer-nav-column">
              <a href="https://ideapro.com.co/servicios/" className="footer-nav-link">Servicios</a>
              <a href="https://ideapro.com.co/experiencias/" className="footer-nav-link">Experiencias</a>
              <a href="https://ideapro.com.co/novedades/" className="footer-nav-link">Novedades</a>
              <a href="https://ideapro.com.co/contactanos/" className="footer-nav-link">Contactanos</a>
              <a href="https://ideapro.com.co/conocenos/" className="footer-nav-link">Conócenos</a>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="footer-social">
            <h4 className="footer-social-title">Síguenos</h4>
            <div className="footer-social-icons">
              <a href="https://www.facebook.com/ideapro.consultores" className="footer-social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.linkedin.com/in/ideapro-consultores-582440212/" className="footer-social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="footer-social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="footer-social-icon"><i className="fab fa-youtube"></i></a>
              <a href="#" className="footer-social-icon"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>

        {/* Parte inferior */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <a href="https://ideapro.com.co/tratamientodatospersonales/" className="footer-legal-link">Tratamiento de Datos Personales</a>
            <a href="https://ideapro.com.co/avisoprivacidad/" className="footer-legal-link">Aviso de Privacidad</a>
            <a href="https://ideapro.com.co/politicacokies/" className="footer-legal-link">Política de Cookies</a>
          </div>
          <div className="footer-copyright">
            Todos los Derechos Reservados &copy;2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;