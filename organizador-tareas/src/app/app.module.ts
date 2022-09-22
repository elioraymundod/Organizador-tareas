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
import { BoardComponent } from './board/board/board.component';
import { BoardItemComponent } from './board/board-item/board-item.component';
import { ColorPanelComponent } from './board/color-panel/color-panel.component';
import { CommentItemComponent } from './board/comment-item/comment-item.component';
import { DialogComponent } from './components/dialog/dialog/dialog.component';
import { DialogBodyComponent } from './components/dialog/dialog-body/dialog-body.component';
import { BoardModule } from './board/board.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TableroPrincipalComponent,
    TablerosComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    BoardModule
  ],
  providers: [
    ProyectosServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
