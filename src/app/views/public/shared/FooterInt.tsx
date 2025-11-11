import React from "react";

export const FooterInt = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e2b39] text-white py-4 mt-auto">
      <div className="mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Panel - Links */}
          <ul className="flex flex-wrap gap-4 md:gap-6 m-0 p-0 list-none">
            <li>
              <a
                href="#"
                className="text-slate-300 hover:text-[#f39200] transition-colors duration-300 text-sm"
              >
                Política de Privacidad
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-300 hover:text-[#f39200] transition-colors duration-300 text-sm"
              >
                Términos de Uso
              </a>
            </li>
          </ul>

          {/* Right Panel - Copyright */}
          <div className="text-slate-300 text-sm text-center md:text-right">
            © {currentYear} Universidad Santo Tomás{" "}
            <span className="inline-block mx-1">
              <i className="fa fa-university"></i>
            </span>{" "}
            <a
              href="#"
              className="text-slate-300 hover:text-[#f39200] transition-colors duration-300"
            >
              Facultad Ingeniería de Sistemas
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};