export class ServicioDelete {

    public static async peticionDelete(urlServicio: string): Promise<any> {

        const datosEnviar = {
            method: "Delete",
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