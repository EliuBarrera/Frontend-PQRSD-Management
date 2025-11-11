import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/images/dashboard/Logo_principal.png";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Aquí puedes agregar lógica adicional de cierre de sesión
    // Por ejemplo: limpiar localStorage, llamar API, etc.
    navigate("/login");
  };

  return (
    <header className="bg-white/70 backdrop-blur-lg border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src={Logo} 
                alt="Logo IdeaPro" 
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* User Menu Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors group">
              <Bell className="w-5 h-5 text-slate-600 group-hover:text-orange-500 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                7
              </span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center shadow-md">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  User
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-500 group-hover:text-slate-700 transition-all ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;