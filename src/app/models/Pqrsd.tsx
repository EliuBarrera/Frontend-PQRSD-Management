export class PQRSD {

    public idPQRSD: number;
    public consecutivo: string;
    public idUsuario: number;
    public idTipoPqrsd: number;
    public idEstado: number;
    public idFuncionarioAsignado: number;
    public idDependenciaAsignada: number;
    public descripcion: string;
    public canalRecepcion: string;
    public fechaRadicacion: Date;
    public fechaAsignacion: Date;
    public fechaVencimiento: Date;
    public fechaRespuesta: Date;
    public numeroOficio: string;
    public mecanismoRespuesta: string;
    public observaciones: string;
    public requiereReclasificacion: boolean;
    public justificacionReclasificacion: string;
    //public archivosAdjuntosPQRSD: string[];

    constructor(
        idPQRSD: number,
        consecutivo: string,
        idUsuario: number,
        idTipoPqrsd: number,
        idEstado: number,
        idFuncionarioAsignado: number,
        idDependenciaAsignada: number,
        descripcion: string,
        canalRecepcion: string,
        fechaRadicacion: Date,
        fechaAsignacion: Date,
        fechaVencimiento: Date,
        fechaRespuesta: Date,
        numeroOficio: string,
        mecanismoRespuesta: string,
        observaciones: string,
        requiereReclasificacion: boolean,
        justificacionReclasificacion: string,
        archivosAdjuntosPQRSD: string[]
    ) {
        // Propiedades simples
        this.idPQRSD = idPQRSD;
        this.consecutivo = consecutivo;
        this.idUsuario = idUsuario;
        this.idTipoPqrsd = idTipoPqrsd;
        this.idEstado = idEstado;
        this.idFuncionarioAsignado = idFuncionarioAsignado;
        this.idDependenciaAsignada = idDependenciaAsignada;
        this.descripcion = descripcion;
        this.canalRecepcion = canalRecepcion;
        this.fechaRadicacion = fechaRadicacion;
        this.fechaAsignacion = fechaAsignacion;
        this.fechaVencimiento = fechaVencimiento;
        this.fechaRespuesta = fechaRespuesta;
        this.numeroOficio = numeroOficio;
        this.mecanismoRespuesta = mecanismoRespuesta;
        this.observaciones = observaciones;
        this.requiereReclasificacion = requiereReclasificacion;
        this.justificacionReclasificacion = justificacionReclasificacion;
        //this.archivosAdjuntosPQRSD = archivosAdjuntosPQRSD;
    }
}

export default PQRSD;
