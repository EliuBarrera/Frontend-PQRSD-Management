import { useEffect } from "react";
import { BarraLateral } from "../../../components/contenedor/BarraLateral";
import { useSelector } from "react-redux";
import * as SettingSelector from "../../../utilities/setting/selectors";
import SliderTab from "../../../utilities/plugins/slider-tabs";
import "../../../styles/admin.css";
import { MainComponent } from "../../public/shared/MainComponente";

export const HomeFunctionary = () => {
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

export default HomeFunctionary;
