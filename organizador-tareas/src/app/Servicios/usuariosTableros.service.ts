import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosTablerosService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
   }

   public insertUsuarioTablero(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios-tableros`, datos);
   }

   public getUsuariosByTablero(codigoTablero: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/all/usuarios/tablero/${codigoTablero}`);
  }
}