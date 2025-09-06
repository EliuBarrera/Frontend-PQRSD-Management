export class Funcionario {

    public idFuncionario: number;
    public nombres: string;
    public identificacion: string;
    public correo: string;
    public clave: string;
    public cargo: string;
    public dependenciaId: number;
    public activo: boolean;
    public fechaCreacion: Date;

    constructor(
        id: number,
        nombres: string,
        identificacion: string,
        correo: string,
        clave: string,
        cargo: string,
        dependenciaId: number,
        activo: boolean,
        fecha: Date,
        
    ) {
        // Propiedades simples
        this.idFuncionario = id;
        this.nombres = nombres;
        this.identificacion = identificacion;
        this.correo = correo;
        this.clave = clave;
        this.cargo = cargo;
        this.dependenciaId = dependenciaId;
        this.activo = activo;
        this.fechaCreacion = fecha;
    }
}
export default Funcionario;