import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {
  baseUrl: string;

  constructor(private http:HttpClient) { 
    this.baseUrl = environment.baseUrl;
  }

  public crearEtiqueta(items: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/etiqueta`, items);
  }

  public getColumnaByCodigo(codigoColumna: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/columnas/${codigoColumna}`);
  }

  public updateColumna(items: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/columnas/actualizar`, items);
  }
}
