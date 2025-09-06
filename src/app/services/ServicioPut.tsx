export class ServicioPut {

    public static async peticionPut(urlServicio: string, objActualizar: any): Promise<any> {

        const datosEnviar = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(objActualizar)
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