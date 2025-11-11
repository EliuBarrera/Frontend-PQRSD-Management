import React from 'react';
import { Facebook, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';

interface FooterProps {
  logoSrc?: string;
}

const Footer: React.FC<FooterProps> = ({ logoSrc }) => {
  return (
    <footer className="bg-[#1e2b39] border-t border-[#f39200] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Contenido Principal del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          
          {/* Logo y Descripción */}
          <div className="flex flex-col items-start">
            {logoSrc ? (
              <img 
                src={logoSrc} 
                alt="IdeaPro Logo" 
                className="h-16 w-auto mb-4"
              />
            ) : (
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#1e2b39] rounded-full"></div>
                  </div>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-white rounded-t-full"></div>
                </div>
                <div>
                  <span className="text-white font-bold text-2xl tracking-tight">
                    IDEAPRO
                  </span>
                </div>
              </div>
            )}
            <p className="text-gray-300 text-sm leading-relaxed">
              Sistema integral de gestión de peticiones
            </p>
          </div>

          {/* Servicios */}
          <div className="flex flex-col">
            <h4 className="text-[#f39200] text-lg font-bold mb-6 uppercase tracking-wide">
              SERVICIOS
            </h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://ideapro.com.co/experiencias/" 
                className="text-gray-300 hover:text-[#f39200] transition-colors duration-300 text-sm"
              >
                Experiencias
              </a>
              <a 
                href="https://ideapro.com.co/novedades/" 
                className="text-gray-300 hover:text-[#f39200] transition-colors duration-300 text-sm"
              >
                Novedades
              </a>
              <a 
                href="https://ideapro.com.co/contactanos/" 
                className="text-gray-300 hover:text-[#f39200] transition-colors duration-300 text-sm"
              >
                Contáctanos
              </a>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col">
            <h4 className="text-[#f39200] text-lg font-bold mb-6 uppercase tracking-wide">
              SÍGUENOS
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/ideapro.consultores" 
                className="w-12 h-12 rounded-full border-2 border-[#f39200] flex items-center justify-center text-[#f39200] hover:bg-[#f39200] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ideapro-consultores-582440212/" 
                className="w-12 h-12 rounded-full border-2 border-[#f39200] flex items-center justify-center text-[#f39200] hover:bg-[#f39200] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border-2 border-[#f39200] flex items-center justify-center text-[#f39200] hover:bg-[#f39200] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border-2 border-[#f39200] flex items-center justify-center text-[#f39200] hover:bg-[#f39200] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border-2 border-[#f39200] flex items-center justify-center text-[#f39200] hover:bg-[#f39200] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Links Legales */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#f39200] transition-colors duration-300"
              >
                Tratamiento de Datos Personales
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#f39200] transition-colors duration-300"
              >
                Aviso de Privacidad
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#f39200] transition-colors duration-300"
              >
                Política de Cookies
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              Todos los Derechos Reservados ©2025
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;