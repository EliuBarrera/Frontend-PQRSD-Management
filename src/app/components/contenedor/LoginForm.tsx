import React from "react";

const LoginForm: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-title">Acceso Administrativo</div>
      <form className="login-form">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          required
          autoComplete="username"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
        />

        <button type="submit" className="login-btn">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
