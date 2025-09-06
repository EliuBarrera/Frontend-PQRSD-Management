import { FC } from "react";
import { RuteoInterno } from "../../../routes/RuteoInterno";
import { FooterInt } from "./FooterInt";
import Header from "./Header";

export const MainComponent: FC = () => {
    return (
        <main className="main-content">
            {/*<div className="position-relative">
                    <Header />
                </div>
                <div className="conatiner-fluid content-inner mt-n5 py-0">
                   <RuteoInterno />
                </div>
                <FooterInt />*/}
            <Header />
            <RuteoInterno />
            <FooterInt />
        </main>
    )
}