export interface Comment {
    id: number,
    text: string,
}

export interface Card {
    id: number,
    text: string,
    like: number,
    descripcion: string,
    fechaInicial: string,
    fechaFin: string,
    usuarioAsignado: string,
    prioridad: string,
    comments: Comment[],
    activities: Actividad[]
}

export interface Actividad {
    id: number,
    nombre: string,
    estatus: number
}

export interface Column {
    id: number,
    title: string,
    color: string,
    list: Card[]
}


export interface Etiqueta {
    id: number,
    text: string,
}
export interface Activity{
    id: number,
    text: string,
    estatus: number
}

export interface ColumnaTest {
    id: number,
    title: string,
    color: string,
    list: Activity[]

}