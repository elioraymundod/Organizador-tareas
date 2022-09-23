export class Comentarios {
    id?: number;
    text?: string;

    constructor(id?: number, text?: string) {
        this.id = id ?? 0;
        this.text = text ?? "";
    }
}