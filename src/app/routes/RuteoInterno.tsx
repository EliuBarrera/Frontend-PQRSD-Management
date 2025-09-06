import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { HomeAdmin } from "../views/public/Admin/HomeAdmin";


// Corrección: La sintaxis correcta para lazy imports
const LazyAdmin = lazy(() => import('../views/public/Admin/LoginAdmin').then(() => ({ default: HomeAdmin })));


export const RuteoInterno = () => {
  return (
      <Routes>
        
      </Routes>
  );
}