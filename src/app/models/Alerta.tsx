export class Alerta {
   
    public idAlerta: number;
    public idPqrsd: number;
    public tipo: string;
    public mensaje: string;
    public leida: boolean;
    public fechaCreacion: Date;
    public fechaLectura: Date;

    constructor(
        id: number,
        idPqrsd: number, 
        tipo: string,
        mensaje: string,
        leida: boolean,
        fechaCreacion: Date,
        fechaLectura: Date
    ) {
        // Propiedades simples
        this.idAlerta = id;
        this.idPqrsd = idPqrsd;
        this.tipo = tipo;
        this.mensaje = mensaje;
        this.leida = leida;
        this.fechaCreacion = fechaCreacion;
        this.fechaLectura = fechaLectura;
    }
}
export default Alerta;