import { useEffect, useState } from "react";
import { BarraLateral } from "../../../components/contenedor/BarraLateral";
import { useSelector } from "react-redux";
import * as SettingSelector from "../../../utilities/setting/selectors";
import SliderTab from "../../../utilities/plugins/slider-tabs";
import "../../../styles/admin.css";
import { MainComponent } from "../../public/shared/MainComponente";

export const HomeAdmin = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        Array.from(
          document.querySelectorAll('[data-toggle="slider-tab"]'),
          (elem: any) => {
            return new SliderTab(elem);
          }
        );
      }, 100);
    };
  });

  const appName = useSelector(SettingSelector.app_name);

  useEffect(() => {
    // Detectar cuando el sidebar cambia de estado
    const checkSidebarState = () => {
      const sidebar = document.querySelector('.sidebar-base');
      if (sidebar) {
        const isCollapsed = sidebar.classList.contains('sidebar-mini');
        setSidebarCollapsed(isCollapsed);
      }
    };

    // Observer para detectar cambios en las clases del sidebar
    const sidebar = document.querySelector('.sidebar-base');
    if (sidebar) {
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
      });

      // Check inicial
      checkSidebarState();

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={`home-grid ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <BarraLateral app_name={appName} />
      <MainComponent />
    </div>
  );
};

export default HomeAdmin;