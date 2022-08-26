import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
declare let $: any;

@Component({
  selector: 'app-tablero-principal',
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css']
})
export class TableroPrincipalComponent implements OnInit {

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['Nombre', 'Abreviatura', 'Descripcion', 'Responsable', 'Acciones']

  constructor() { }

  ngOnInit(): void {
  }

  ingresarTablero(){
    $('#crearTableroModal').modal('show');
  }

}
