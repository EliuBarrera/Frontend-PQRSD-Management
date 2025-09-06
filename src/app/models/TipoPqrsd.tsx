export class TipoPQRSD {

    public idTipoPQRSD: number;
    public nombre: string;
    public plazoDias: number;
    public descripcion?: string;
    public baseNormativa?: string;
    
    constructor(
        id: number,
        nombre: string,
        plazoDias: number,
        descripcion?: string,
        baseNormativa?: string
    ) {
        // Propiedades simples
        this.idTipoPQRSD = id;
        this.nombre = nombre;
        this.plazoDias = plazoDias;
        this.descripcion = descripcion || '';
        this.baseNormativa = baseNormativa || '';
    }
}

export default TipoPQRSD;