import React from "react";
import Header from "./Header";
import { BarraLateral } from "./BarraLateral";
import { FooterInt } from "./FooterInt";
import "../../../styles/admin.css";
import { useSelector } from "react-redux";
import * as SettingSelector from "../../../utilities/setting/selectors";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  const appName = useSelector(SettingSelector.app_name);

  return (
    <div className="container-fluid">
      <BarraLateral app_name={appName}/>
      <Header />
      <div className="row">
        <main className="col-lg-10 col-md-9 main-content">
          {children}
        </main>
      </div>
      <FooterInt />
    </div>
  );
};

export default Layout;
