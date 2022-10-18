import * as internal from "stream";

export class Etiqueta{
    id?: number;
    nombre?: string;
    fecha_creacion?: Date;
    usuario_creacion?: string;
    tablero?: number;
    fecha_modificacion?: Date;
    usuario_modificacion?: string;

    constructor(id?: number, nombre?: string, fecha_creacion?: Date, usuario_creacion?: string,
        tablero?:number,fecha_modificacion?: Date, usuario_modificacion?: string) {
        this.id = id ?? 0;
        this.nombre = nombre ?? "";
        this.fecha_creacion = fecha_creacion ?? new Date();
        this.usuario_creacion = usuario_creacion ?? ""; 
        this.tablero = tablero ?? 0 ;
        this.fecha_modificacion = fecha_modificacion ?? new Date();
        this.usuario_modificacion = usuario_modificacion ?? "";
    }
}