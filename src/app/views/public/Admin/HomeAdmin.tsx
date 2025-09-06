import React, { useEffect } from "react";
import Layout from "../shared/Layout";
import { BarraLateral } from "../shared/BarraLateral";
import Header from "../shared/Header";
import { FooterInt } from "../shared/FooterInt";
import { useSelector } from "react-redux";
import * as SettingSelector from "../../../utilities/setting/selectors";
import { RuteoInterno } from "../../../routes/RuteoInterno";
import SliderTab from "../../../utilities/plugins/slider-tabs";
import "../../../styles/admin.css";
import { MainComponent } from "../shared/MainComponente";

export const HomeAdmin = () => {
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
    //const appName = useSelector((state: RootState) => state.setting.setting.app_name.value);
    useEffect(() => { });
    return (
        <div className="home-grid">
            <BarraLateral app_name={appName} /> 
            <MainComponent />
        </div>
    );
};
