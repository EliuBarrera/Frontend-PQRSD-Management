export class Dependencia {
   
    public idDependencia: number;
    public nombre: string;
    public activa: boolean;
    public descripcion: string;

    constructor(
        id: number,
        nombre: string,
        activa: boolean,
        descripcion: string
    ) {
        // Propiedades simples
        this.idDependencia = id;
        this.nombre = nombre;
        this.activa = activa;
        this.descripcion = descripcion || '';
    }
}

export default Dependencia;