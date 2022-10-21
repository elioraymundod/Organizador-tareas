import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProyectosServiceService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public crearProyecto(items: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/proyectos`, items);
  }

  public getTableroByCodigo(codigoProyecto: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/proyectos/${codigoProyecto}`);
  }

  public getAllProyectos(usuario: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/obtener/all/proyectos/${usuario}`
    );
  }
  public putProyecto(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/actualizar/proyecto`, data);
  }

  public deleteProyecto(codigoProyecto: any): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/eliminar/proyecto/${codigoProyecto}`
    );
  }
}
