export class HistorialEstado {

    public idHistorialEstado: number;
    public idPqrsd: number;
    public idEstado: number;
    public idFuncionario: number;
    public observaciones: string;
    public fechaCambio: Date;

    constructor(
        idHistorialEstado: number,
        idPqrsd: number,
        idEstado: number,
        idFuncionario: number,
        observaciones ?: string,
        fechaCambio ?: Date
        
    ) {
        // Propiedades simples
        this.idHistorialEstado = idHistorialEstado;
        this.idPqrsd = idPqrsd;
        this.idEstado = idEstado;
        this.idFuncionario = idFuncionario;
        this.observaciones = observaciones || '';
        this.fechaCambio = fechaCambio || new Date();
    }

}

export default HistorialEstado;
