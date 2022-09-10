import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableroPrincipalComponent } from './tablero-principal/tablero-principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import * as $ from "jquery";
import { TablerosComponent } from './tableros/tableros.component';
import { ProyectosServiceService } from './Servicios/proyectos-service.service';

@NgModule({
  declarations: [
    AppComponent,
    TableroPrincipalComponent,
    TablerosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ],
  providers: [
    ProyectosServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
