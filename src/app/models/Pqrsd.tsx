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

      // Método para calcular fecha de vencimiento
  public calcularFechaVencimiento(plazo_dias: number): void {
    const fecha = new Date(this.fechaRadicacion);
    fecha.setDate(fecha.getDate() + plazo_dias);
    this.fechaVencimiento = fecha;
  }

  // Método para generar número de oficio
  public generarNumeroOficio(): string {
    const year = this.fechaRadicacion.getFullYear();
    const consecutivo = String(this.idPQRSD).padStart(4, '0');
    this.numeroOficio = `PQRSD-${year}-${consecutivo}`;
    return this.numeroOficio;
  }

  // Método para verificar si está vencida
  public estaVencida(): boolean {
    return new Date() > this.fechaVencimiento && !this.fechaRespuesta;
  }

  // Método para obtener días restantes
  public diasRestantes(): number {
    const hoy = new Date();
    const diferencia = this.fechaVencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }
}

export default PQRSD;
