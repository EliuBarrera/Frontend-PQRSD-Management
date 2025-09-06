import React from 'react';

export const BarraProgreso: React.FC = () => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-bar-value"></div>
      </div>
      <p>Cargando...</p>
    </div>
  );
};