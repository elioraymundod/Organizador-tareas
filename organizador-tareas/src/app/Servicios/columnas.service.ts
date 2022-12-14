import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColumnasService {
  baseUrl: string;
  public codigoTablero: string | null;
  public tableroPublico: boolean | null;
  public avance: string | null;
  public nombreTablero: String | null;

  constructor(private http:HttpClient) { 
    this.baseUrl = environment.baseUrl;
    this.codigoTablero = '';
    this.avance = "0";
    this.tableroPublico = false;
    this.nombreTablero = "";
  }

  public crearColumna(items: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/columnas`, items);
  }

  public getColumnaByCodigo(codigoColumna: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/columnas/${codigoColumna}`);
  }

  public updateColumna(items: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/columnas/actualizar`, items);
  }
}
