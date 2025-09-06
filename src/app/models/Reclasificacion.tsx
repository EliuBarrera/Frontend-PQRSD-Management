export class Reclasificacion {
   
    public idReclasificaciones: number;
    public idPqrsd: number;
    public idFuncionarioSolicitante: number;
    public idDependenciaActual: number;
    public idDependeciaPropuesta: number;
    public idAdministradorResponsable: number;
    public justificacion: string;
    public estado: string;
    public fechaSolicitud: Date;
    public fechaResolucion: Date;

    constructor(
        idReclasificaciones: number,
        idPqrsd: number,
        idFuncionarioSolicitante: number,
        idDependenciaActual: number,
        idDependeciaPropuesta: number,
        idAdministradorResponsable: number,
        justificacion: string,
        estado: string,
        fechaSolicitud: Date,
        fechaResolucion: Date
    ) {
        // Propiedades simples
        this.idReclasificaciones  = idReclasificaciones;
        this.idPqrsd = idPqrsd;
        this.idFuncionarioSolicitante = idFuncionarioSolicitante;
        this.idDependenciaActual = idDependenciaActual;
        this.idDependeciaPropuesta = idDependeciaPropuesta;
        this.idAdministradorResponsable = idAdministradorResponsable;
        this.justificacion = justificacion;
        this.estado = estado;
        this.fechaSolicitud = fechaSolicitud;
        this.fechaResolucion = fechaResolucion;
    }
}

export default Reclasificacion;
