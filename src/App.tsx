import React, { Suspense, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { RuteoPrincipal } from './app/routes/RuteoPrincipal';
import { ToastContainer } from 'react-toastify';
//import LoginPage from './app/login/LoginPage';

const inicioComponente = () => {
  return (
    <div id="loading" >
      <div id="loading-center"></div>
    </div>
  )
}

function App() {
  return (
    
    <div className='App min-h-screen'>
      <ToastContainer />
      <BrowserRouter >
        <Suspense fallback={inicioComponente()}>
          <RuteoPrincipal/>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
export default App;
