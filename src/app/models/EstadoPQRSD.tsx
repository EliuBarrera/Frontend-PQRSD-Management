export class EstadoPQRSD {
    
    public idEstadoPQRSD: number;
    public nombre: string;
    public descripcion: string;
    
    constructor(
        id: number,
        nombre: string,
        descripcion?: string
    ) {
        // Propiedades simples 
        this.idEstadoPQRSD = id;
        this.nombre = nombre;
        this.descripcion = descripcion || '';
    }
}
export default EstadoPQRSD;
