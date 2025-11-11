// Importaciones directas para componentes principales
import { DashboardFuncionario } from '../views/private/Funcionario/DashboardFuncionario';
import { DetallePqrsd } from '../views/private/Funcionario/DetallePqrsd';
import { EstadisticasFuncionario } from '../views/private/Funcionario/EstadisticasFuncionario';
import { MisPqrsd } from '../views/private/Funcionario/MisPqrsd';
import { ModalReclasificacion } from '../views/private/Funcionario/ModalReclasificacion';
import DashboardAdmin from '../views/private/Admin/DashboardAdmin';
import React, { lazy, Suspense } from 'react';
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { BarraProgreso } from '../components/shared/BarraProgreso';
import HomeAdmin from '../views/private/Admin/HomeAdmin';
import { ErrorInterno } from '../components/shared/ErrorInterno';

// Lazy load<Route pathing para componentes de funcionario
const LazyFuncionarioDash = lazy(() => 
  import('../views/private/Funcionario/DashboardFuncionario')
    .then(() => ({ default: DashboardFuncionario }))
);
const LazyFuncionarioDetallePqrsd = lazy(() => 
  import('../views/private/Funcionario/DetallePqrsd')
    .then(() => ({ default: DetallePqrsd }))
);
const LazyFuncionarioEstadisticas = lazy(() => 
  import('../views/private/Funcionario/EstadisticasFuncionario')
    .then(() => ({ default: EstadisticasFuncionario }))
);
const LazyFuncionarioMisPqrsd = lazy(() => 
  import('../views/private/Funcionario/MisPqrsd')
    .then(() => ({ default: MisPqrsd }))
);
const LazyFuncionarioReclasificacion = lazy(() => 
  import('../views/private/Funcionario/ModalReclasificacion')
    .then(() => ({ default: ModalReclasificacion }))
);
const LazyAdminDash = lazy(() => 
  import('../views/private/Admin/DashboardAdmin')
    .then(() => ({ default: DashboardAdmin }))
);

export const RuteoInterno = () => {
  const location = useLocation();
  
  // Determinar tipo de usuario
  const userType = location.pathname.includes('/admin') ? 'admin' : 'functionary';
  
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

  return (
    <Suspense fallback={<Cargando />}>
      <Routes>
        {userType === 'admin' ? (
          // RUTAS ADMINISTRADOR
          <>
            <Route path="/dash" element={<LazyAdminDash />} />
            {/* <Route path="/pqrsd" element={<LazyAdminGestionPqrsd />} />
            <Route path="/usuarios" element={<LazyAdminGestionUsuarios />} />
            <Route path="/dependencias" element={<LazyAdminGestionDependencias />} />
            <Route path="/reportes" element={<LazyAdminReportes />} />
            <Route path="/configuracion" element={<LazyAdminConfiguracion />} /> */}
            <Route path="/" element={<Navigate to="/admin/dash" replace />} />
          </>
        ) : (
          // RUTAS FUNCIONARIO  
          <>
            <Route path="/dash" element={<LazyFuncionarioDash />} />
            <Route path="/detailPqrsd" element={<LazyFuncionarioDetallePqrsd />} />
            <Route path="/estadisticas" element={<LazyFuncionarioEstadisticas />} />
            <Route path="/pqrsd" element={<LazyFuncionarioMisPqrsd />} />
            {/*<Route path="/reclasificacion" element={<LazyFuncionarioReclasificacion />} />*/}
            <Route path="/" element={<Navigate to="/functionary/dash" replace />} />
          </>
        )}
        
        {/* Rutas comunes */}
        <Route path="/unauthorized" element={
          <div className="container text-center mt-5">
            <h1 style={{ color: '#dc3545' }}>403 - No Autorizado</h1>
            <p className="text-muted">No tienes permisos para acceder a esta página</p>
          </div>
        } />
        
        <Route path="*" element={
          <ErrorInterno/>
        } />
      </Routes>
    </Suspense>
  );
};

export default RuteoInterno;