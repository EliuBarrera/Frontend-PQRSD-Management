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
          <li><a href="#" className="active">Panel de Inicio</a></li>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Ayuda</a></li>
        </ul>

        <div className="user-menu">
          <a href="#" className="position-relative">
            <span className="fa fa-bell">777</span>
          </a>
          <div className="user-dropdown">
            <div className="user-avatar">
            </div>
            <span>User (Admin/Funcionary)</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
