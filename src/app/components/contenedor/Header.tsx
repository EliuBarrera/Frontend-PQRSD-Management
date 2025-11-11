import React, { useState } from 'react';

interface HeaderProps {
  onContactClick?: () => void;
  showContactButton?: boolean;
  logoSrc?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onContactClick, 
  showContactButton = true,
  logoSrc
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='w-full'>
      <div className='flex-1 justify-between pt-4 px-4 sm:px-6 lg:px-8'>
        <nav className='max-w-7xl mx-auto bg-[#d1d5db] shadow-xl rounded-3xl'>
          <div className='px-6 sm:px-8 lg:px-12'> 
            <div className='p-4 flex items-center justify-between h-20'> 
              {/* Logo */}
              <a href="/" className='flex items-center transition-transform hover:scale-105'>
                {logoSrc ? (
                  <img 
                    //src={logoSrc}
                    src='../../../assets/images/Logo_principal.png' 
                    alt="Logo IdeaPro" 
                    className='h-14 w-auto'
                  />
                ) : (
                  <div className='flex items-center gap-1'>
                    <div className='relative'>
                      <div className='w-12 h-12 bg-[#f39200] rounded-full flex items-center justify-center border-4 border-[#f39200]/30'>
                        <div className='w-6 h-6 bg-white rounded-full'></div>
                      </div>
                      <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-[#f39200] rounded-t-full'></div>
                    </div>
                    <div className='ml-2'>
                      <span className='text-[#1e2b39] font-bold text-3xl tracking-tight'>
                        IDEA<span className='text-[#f39200]'>PRO</span>
                      </span>
                    </div>
                  </div>
                )}
              </a>

              {/* Desktop Navigation */}
              <div className='hidden lg:flex items-center'>
                <ul className="flex items-center gap-10">
                  <li>
                    <a 
                      href="/" 
                      className='text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300'
                    >
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#servicios" 
                      className='text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300'
                    >
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#experiencias" 
                      className='text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300'
                    >
                      Experiencias
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#novedades" 
                      className='text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300'
                    >
                      Novedades
                    </a>
                  </li>
                  {showContactButton && (
                    <li>
                      <a 
                        href="#contacto" 
                        className="px-8 py-3 bg-transparent border-3 border-[#f39200] text-[#f39200] text-lg font-bold rounded-xl hover:bg-[#f39200] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md" 
                        onClick={handleContactClick}
                      >
                        Contáctanos
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className='lg:hidden p-2 rounded-lg hover:bg-white/50 transition-colors'
                aria-label='Toggle menu'
              >
                <svg 
                  className='w-7 h-7 text-[#1e2b39]' 
                  fill='none' 
                  stroke='currentColor' 
                  viewBox='0 0 24 24'
                >
                  {isMenuOpen ? (
                    <path 
                      strokeLinecap='round' 
                      strokeLinejoin='round' 
                      strokeWidth={2.5} 
                      d='M6 18L18 6M6 6l12 12' 
                    />
                  ) : (
                    <path 
                      strokeLinecap='round' 
                      strokeLinejoin='round' 
                      strokeWidth={2.5} 
                      d='M4 6h16M4 12h16M4 18h16' 
                    />
                  )}
                </svg>
              </button>
            </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className='lg:hidden pb-6 border-t border-white/30 mt-2 pt-4'>
              <ul className="flex flex-col gap-4">
                <li>
                  <a 
                    href="/" 
                    className='block text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300 py-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a 
                    href="#servicios" 
                    className='block text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300 py-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a 
                    href="#experiencias" 
                    className='block text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300 py-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Experiencias
                  </a>
                </li>
                <li>
                  <a 
                    href="#novedades" 
                    className='block text-[#1e2b39] text-lg font-semibold hover:text-[#f39200] transition-colors duration-300 py-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Novedades
                  </a>
                </li>
                {showContactButton && (
                  <li className='mt-2'>
                    <a 
                      href="#contacto" 
                      className="inline-block w-full text-center px-8 py-3 bg-transparent border-3 border-[#f39200] text-[#f39200] text-lg font-bold rounded-xl hover:bg-[#f39200] hover:text-white transition-all duration-300" 
                      onClick={(e) => {
                        handleContactClick(e);
                        setIsMenuOpen(false);
                      }}
                    >
                      Contáctanos
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;