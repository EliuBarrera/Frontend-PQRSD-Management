import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../components/contenedor/Home";
import { Error } from "../components/shared/Error";
import LoginAdmin from "../views/public/Admin/LoginAdmin";
import { HomeAdmin } from "../views/public/Admin/HomeAdmin";
// Importamos el componente de carga
import { BarraProgreso } from "../components/shared/BarraProgreso";

// Corrección: La sintaxis correcta para lazy imports
const LazyError = lazy(() => import('../components/shared/Error').then(() => ({ default: Error })));
const LazyHome = lazy(() => import('../components/contenedor/Home').then(() => ({ default: Home })));
const LazyAdminLogin = lazy(() => import('../views/public/Admin/LoginAdmin').then(() => ({ default: LoginAdmin })));
const LazyAdmin = lazy(() => import('../views/public/Admin/LoginAdmin').then(() => ({ default: HomeAdmin })));

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
        <Route path="/home/*" element={<LazyHome />} />
        <Route path="/loginAdmin/*" element={<LoginAdmin />} />
        <Route path="/admin/*" element={<HomeAdmin />} />
        
        {/* Las rutas obligatorias */}
        <Route path="/" element={<LazyHome />} />
        <Route path="*" element={<LazyError />} />
      </Routes>
    </Suspense>
  );
}