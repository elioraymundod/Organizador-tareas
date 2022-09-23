import { Comentarios } from "./Comentarios";

export class Tareas {
    id?: number;
    nombre?: string;
    descripcion?: string;
    esfuerzo?: number;
    etiqueta?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    informador?: string;
    prioridad?: number;
    progreso?: number;
    usuario_asignado?: string;
    fecha_creacion?: Date;
    usuario_creacion?: string;
    usuario_modificacion?: string;
    fecha_modificacion?: Date;
    comments?: Comentarios[];

    constructor(id?: number, nombre?: string, descripcion?: string, esfuerzo?: number, etiqueta?: string, fecha_inicio?: Date, fecha_fin?: Date,
        informador?: string, prioridad?: number, progreso?: number, usuario_asignado?: string, fecha_creacion?: Date, usuario_creacion?: string,
        usuario_modificacion?: string, fecha_modificacion?: Date, comments?: Comentarios[]) {
        this.id = id ?? 0;
        this.nombre = nombre ?? "";
        this.descripcion = descripcion ?? "";
        this.esfuerzo = esfuerzo ?? 0;
        this.etiqueta = etiqueta ?? "";
        this.fecha_inicio = fecha_inicio ?? new Date();
        this.fecha_fin = fecha_fin ?? new Date();
        this.informador = informador ?? "";
        this.prioridad = prioridad ?? 0;
        this.progreso = progreso ?? 0;
        this.usuario_asignado = usuario_asignado ?? "";
        this.fecha_creacion = fecha_creacion ?? new Date();
        this.usuario_creacion = usuario_creacion ?? "";
        this.usuario_modificacion = usuario_modificacion ?? "";
        this.fecha_modificacion = fecha_modificacion ?? new Date();
        this.comments = comments ?? [];
    }
}