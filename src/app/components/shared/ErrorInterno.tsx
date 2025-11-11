import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorInterno = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 p-4">
        <div className="text-center max-w-md">
          {/* Error Code */}
          <h1 className="text-8xl font-bold text-[#f39200] mb-4 drop-shadow-lg">
            500
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl font-semibold text-white mb-3">
            ¡Error interno del servidor!
          </p>
          
          {/* Description */}
          <p className="text-slate-300 text-base mb-8 leading-relaxed">
            Algo salió mal en nuestro sistema ⚡.
            <br />
            No es tu culpa, estamos trabajando en solucionarlo.
          </p>
          
          {/* Return Button */}
          <button
            onClick={handleGoBack}
            className="inline-block bg-[#1e2b39] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#25394a] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};