import { FC } from "react";
import { RuteoInterno } from "../../../routes/RuteoInterno";
import { FooterInt } from "./FooterInt";
import Header from "./Header";

export const MainComponent: FC = () => {
    return (
        <main className="main-content">
            <Header />
            <div className="container-fluid content-inner mt-5 py-0">
                <RuteoInterno />
            </div>
            <FooterInt />
        </main>
    )
}