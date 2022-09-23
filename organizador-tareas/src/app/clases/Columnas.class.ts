import { Tareas } from "./Tareas";

export class Columnas {
    id?: Number;
    title?: String;
    color?: String;
    list?: Tareas[];

    constructor(id?: number, title?: string, color?: string, list?: Tareas[]) {
        this.id = id ?? 0;
        this.title = title ?? "";
        this.color = color ?? "";
        this.list = list ?? [];
    }
}