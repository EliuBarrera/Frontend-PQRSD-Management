/* import { jwtDecode } from "jwt-decode"; */
import { URLS } from "../utilities/domains/Urls";
import { useNavigate } from "react-router-dom";

/* import { Acceso } from "../models/Acceso";
import { URLS } from "../utilities/dominios/urls";
 */
export class ServicioAcceso {

    public static async iniciarSesion(objAcceso: any): Promise<any> {
        const datosEnviar = {
            method: "POST",
            body: JSON.stringify(objAcceso),
            headers: { "Content-Type": "application/json; chatset=UTF-8" }
        }

        const urlEnviar = URLS.URL_BASE + URLS.INICIO_SESION;

        const respuesta = fetch(urlEnviar, datosEnviar)
            .then((res) => { return res.json() })
            .then((datos) => { return datos })
            .catch((elError) => { return elError });

        return respuesta;
    }

    public static verificarSesion(): any {
        let sesionUsuario = null;
        try {
            const token: any = localStorage.getItem("TOKEN_AUTORIZACION");
/*             sesionUsuario = jwtDecode(token) as DatoSesion; */
        } catch (err) {
            localStorage.removeItem("TOKEN_AUTORIZACION");
            throw sesionUsuario;
        }
        return sesionUsuario;
    }


}