export class Administrador {

        public idAdministrador: number;
        public nombres: string;
        public identificacion: string;
        public correo: string;
        public clave: string;
        public activo: boolean;
        public fechaCreacion: Date;

    constructor(
        id: number,
        nombres: string,
        identificacion: string,
        correo: string,
        clave: string,
        activo: boolean,
        fecha: Date
    ) {
        // Propiedades simples
        this.idAdministrador = id;
        this.nombres = nombres;
        this.identificacion = identificacion;
        this.correo = correo;
        this.clave = clave;
        this.activo = activo;
        this.fechaCreacion = fecha
    }
}

export default Administrador;
