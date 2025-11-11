import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../components/contenedor/Home";
import { Error } from "../components/shared/Error";
import { Login } from "../views/public/shared/Login";
import { HomeAdmin } from "../views/private/Admin/HomeAdmin";
import HomeFunctionary from "../views/private/Funcionario/HomeFunctionary";
import { PqrsdCrear } from "../views/private/pqrsd/PqrsdCrear";
import { PqrsdConsultar } from "../views/private/pqrsd/PqrsdConsultar";
// Importamos el componente de carga
import { BarraProgreso } from "../components/shared/BarraProgreso";

// Corrección: La sintaxis correcta para lazy imports
const LazyError = lazy(() => import('../components/shared/Error').then(() => ({ default: Error })));
const LazyHome = lazy(() => import('../components/contenedor/Home').then(() => ({ default: Home })));
const LazyLogin = lazy(() => import('../views/public/shared/Login').then(() => ({ default: Login })));
const LazyHomeAdmin = lazy(() => import('../views/private/Admin/HomeAdmin').then(() => ({ default: HomeAdmin })));
const LazyHomeFunctionary = lazy(() => import('../views/private/Funcionario/HomeFunctionary').then(() => ({ default: HomeFunctionary })));
const LazyRegistrarPqrsd = lazy(() => import('../views/private/pqrsd/PqrsdCrear').then(() => ({ default: PqrsdCrear })));
const LazyConsultarPqrsd = lazy(() => import('../views/private/pqrsd/PqrsdConsultar').then(() => ({ default: PqrsdConsultar })));

// Componente de carga para Suspense
const Cargando = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh' 
  }}>
    <BarraProgreso />
  </div>
);

export const RuteoPrincipal = () => {
  return (
    <Suspense fallback={<Cargando />}>
      <Routes>
        <Route path="/login/*" element={<LazyLogin />} />
        <Route path="/admin/*" element={<LazyHomeAdmin />} />
        <Route path="/functionary/*" element={<LazyHomeFunctionary />} />
        <Route path="/crear/*" element={<LazyRegistrarPqrsd />} />
        <Route path="/consultar/*" element={<LazyConsultarPqrsd/>} />

        
        {/* Las rutas obligatorias */}
        <Route path="/" element={<LazyHome />} />
        <Route path="*" element={<LazyError />} />
      </Routes>
    </Suspense>
  );
}