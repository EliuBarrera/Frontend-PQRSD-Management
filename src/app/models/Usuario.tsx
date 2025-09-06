export class Usuario {
   
    public idUsuario: number;
    public tipo: string;
    public nombre: string;    
    public identificacion: string;
    public contacto: string;    
    public correo: string;
    public direccion: string;
    public telefono: string;
    public fechaRegistro: Date;

    constructor(
        id: number,
        tipo: string,
        nombre: string,
        identificacion: string,
        contacto?: string,
        correo?: string,
        direccion?: string,
        telefono?: string,
        fecha?: Date
    ) {
        // Propiedades simples
        this.idUsuario = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.contacto = contacto || '';
        this.correo = correo || '';
        this.direccion = direccion || '';
        this.telefono = telefono || '';
        this.fechaRegistro = fecha || new Date();
    }
}

export default Usuario;