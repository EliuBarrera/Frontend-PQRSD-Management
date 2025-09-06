export class Metrica {

    public idMetrica: number;
    public nombre: string;
    public tipo: string;
    public valor: number;
    public periodo: Date;
    public idDependencia: number;
    public fechaCalculo: Date;

    constructor(
        id: number,
        nombre: string,
        tipo: string,
        valor: number,
        periodo: Date,
        idDependencia: number,
        fechaCalculo: Date
    ) {
        // Propiedades simples
        this.idMetrica = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.periodo = periodo;
        this.idDependencia = idDependencia;
        this.fechaCalculo = fechaCalculo;
    }
}

export default Metrica;