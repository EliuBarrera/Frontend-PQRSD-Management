export class ServicioGet {

    public static async peticionGet(urlServicio: string): Promise<any> {

        const datosEnviar = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        }

        const respuesta = fetch(urlServicio, datosEnviar)
            .then((res) => {
                    return res.json();
            }).then((losDatos) => {
                return losDatos;
            }).catch((elError) => {
                return elError;
            });


        return respuesta;
    }

}