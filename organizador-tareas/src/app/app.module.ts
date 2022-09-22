import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableroPrincipalComponent } from './tablero-principal/tablero-principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import { TablerosComponent } from './tableros/tableros.component';
import { ProyectosServiceService } from './Servicios/proyectos-service.service';
import { BoardModule } from './board/board.module';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';

=======
import { NgxSpinnerModule } from 'ngx-spinner';
>>>>>>> 20666b131ac5aa01827ed032817b712e006b73de

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
    BoardModule,
    NgxSpinnerModule,
  ],
  providers: [
    ProyectosServiceService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
