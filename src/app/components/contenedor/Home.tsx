import React, { useState, useEffect } from 'react';
import Header from './Header';
import Card from './Card';
import Footer from './Footer';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
    setShowModal(false);
  };

  return (
    <>
      <Header onContactClick={handleContactClick}/>

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center min-h-screen m-15">
        <section className='max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8'>
          <header className="text-center mb-10 border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Sistema Integral de Gestión
            </h1>
            <p className="text-gray-600">Seleccione su método de acceso al sistema</p>
          </header>

          <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
            <Card
              type="admin"
              title="ACCESO AL SISTEMA"
              icon="👥"
              description="Acceso para administradores y funcionarios para la gestión."
              buttonText="Ingresar"
              link="login"
            />

            <Card
              type="pqrsd"
              title="REGISTRAR PQRSD"
              icon="📝"
              description="Registrar Peticiones, Quejas, Reclamos, Sugerencias y Denuncias para seguimiento y resolución."
              buttonText="Registrar"
              link="crear"
            />

            <Card
              type="estado"
              title="REVISAR ESTADO"
              icon="🔍"
              description="Consulta el estado de tus Peticiones, Quejas, Reclamos, Sugerencias y Denuncias registradas."
              buttonText="Revisar Estado"
              link="consultar"
            />
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Contáctanos
            </h2>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
                  Asunto
                </label>
                <select
                  id="subject"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="">Seleccione un asunto</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="informacion">Información general</option>
                  <option value="pqrsd">PQRSD</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Botón de scroll-top */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-full shadow-lg transition duration-200 animate-fadeIn"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default Home;
