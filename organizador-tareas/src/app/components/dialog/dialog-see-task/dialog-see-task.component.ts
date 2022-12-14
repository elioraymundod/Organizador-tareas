import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card, Column } from 'src/app/models/column.model';
import { BoardService } from 'src/app/Servicios/board.service';
import { ColumnasService } from 'src/app/Servicios/columnas.service';
import { EtiquetasService } from 'src/app/Servicios/etiquetas.service';
import { EnvioCorreoService } from 'src/app/Servicios/envio-correos.service';
import { LoginService } from 'src/app/Servicios/LoginService.service';
import { UsuariosTablerosService } from 'src/app/Servicios/usuariosTableros.service';
import Swal from 'sweetalert2';

interface Usuarios {
  ID: string;
  NOMBRE: string;
}
interface Etiqueta {
  ID: string;
  NOMBRE: string;
}

@Component({
  selector: 'app-dialog-see-task',
  templateUrl: './dialog-see-task.component.html',
  styleUrls: ['./dialog-see-task.component.css']
})
export class DialogSeeTaskComponent implements OnInit{
  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  formActivity: FormGroup
  avance: any;
 /* usuarios: Usuarios[] = [
    { ID: '1', NOMBRE: 'Melani' },
    { ID: '2', NOMBRE: 'Elio' },
    { ID: '3', NOMBRE: 'Selvin' },
  ];*/

  usuarios: any[] = [];
  commentInput = '';
  comments: any[] = [];

  prioridades: Usuarios[] = [
    { ID: '1', NOMBRE: 'Alta' },
    { ID: '2', NOMBRE: 'Media' },
    { ID: '3', NOMBRE: 'Baja' },
  ];
  //etiquetas
  etiqueta = new FormControl('');
  /*etiquetasList: Etiquetas[] = [
    {ID: '1', NOMBRE: 'Alta'},
    {ID: '2', NOMBRE: 'Media'},
    {ID: '3', NOMBRE: 'Baja'},
  ];*/
  etiquetasList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogSeeTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public boardService: BoardService,
    private _formBuilder: FormBuilder,
    public columnasService: ColumnasService,
    public etiquetasService: EtiquetasService,
    private usuariosTablerosService: UsuariosTablerosService,
    private loginService: LoginService,
    private envioCorreo: EnvioCorreoService
  ) {  
    this.formActivity = this._formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.avance = this.columnasService.avance;
    this.getEtiquetas()

    this.usuariosTablerosService.getUsuariosByTablero(this.columnasService.codigoTablero).subscribe(res => {
      this.usuarios = res;
      this.usuarios.forEach(usuario => {
        usuario.ID = String(usuario.ID)
      })
    })

    this.comments = this.data.comments
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.')
  } 

  onCommentTextEmit(id: number) {
    this.emitText.emit({ id, text: this.commentInput });
    this.commentInput = ''
  }

  onDeleteComment(comment: { id: any; }, columnId: any){
    this.boardService.deleteComment(columnId, this.data.cardId, comment.id)
    this.boardService.board = this.boardService.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((card: Card) => {
          if(card.id === this.data.cardId) {
            this.comments = card.comments
          }
        })
      }
      return column;
    })
  }

  onAddComment(event: { text: string }, columnId: number) {
    this.boardService.addComment(columnId, this.data.cardId, event.text)
    this.boardService.board = this.boardService.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((card: Card) => {
          if(card.id === this.data.cardId) {
            this.comments = card.comments
          }
        })
      }
      return column;
    })
    this.commentInput = ''
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    //this.boardService.saveChanges(this.codigoTablero);
  }

  onDeleteCard(cardId: any, columnId: number, activityId: number) {
    this.boardService.deleteActivity(cardId, columnId, activityId, this.columnasService.codigoTablero)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 /* ngOnInit(): void {
  }*/

  onAddActivities(columnId: number, cardId: number) { //event: { id: number, nombre: string, status: number}, columnId: number
    let nombre = this.formActivity.get('nombre')?.value;
    this.boardService.addActivity(columnId, cardId, nombre, 1);
    this.formActivity.get('nombre')?.setValue(" ")
  }

  getEtiquetas() {
    this.etiquetasService.getEtiquetaByTablero(this.columnasService.codigoTablero).subscribe(res => {
      this.etiquetasList = res
    })
  }

  saveChanges(){
    this.boardService.board = this.boardService.board.map((column: Column) => {
      if(column.id === this.data.columnId) {
        const list = column.list.map((card: Card) => {
          if(card.id === this.data.cardId) {
            if(card.usuarioAsignado !== this.data.usuarioAsignado){
              this.loginService.getUserById(this.data.usuarioAsignado).subscribe(res => {
                this.enviarCorreoTareaAsignada(res[0].EMAIL);
              })
            }
            card.esfuerzo = this.data.esfuerzo
            card.prioridad = this.data.prioridad
            card.usuarioAsignado = this.data.usuarioAsignado
            card.fechaInicial = this.data.fechaInicio
            card.fechaFin = this.data.fechaFin
            card.etiqueta = this.data.etiqueta
            card.descripcion = this.data.descripcion
          }
          return card;
        });
        column.list = list;
      }
      return column
    })
    this.boardService.saveChanges(this.columnasService.codigoTablero);
    this.boardService.board$.next([...this.boardService.board]);
    Swal.fire({
      icon: 'success',
      title: 'Informaci??n almacenada con ??xito'
    })
  }

  enviarCorreoTareaAsignada(email: any){
    const datosCorreo = {
      paraCorreo: email,
      asuntoCorreo: 'Asignaci??n de tarea',
      cuerpoCorreo: '',
      htmlCorreo: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Copia de Nueva plantilla de correo electrC3B3nico 2022-10-16</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"><!--<![endif]-->
  <style type="text/css">
#outlook a {
	padding:0;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:10px 30px 10px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:22px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:22px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
</style>
 </head>
 <body style="width:100%;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#FFE7F3"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#FFE7F3"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFE7F3">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#D8599E" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#D8599E;border-right:4px solid #ffffff;border-left:4px solid #ffffff;width:600px">
             <tr>
              <td align="left" bgcolor="#7e3b39" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-bottom:40px;background-color:#7e3b39">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:552px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:30px"><h1 style="Margin:0;line-height:60px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:50px;font-style:normal;font-weight:bold;color:#FFFFFF">Tienes una tarea asignada</h1></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#FFFFFF"><br></h2></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:24px;color:#ffffff;font-size:16px">Te han asignado la tarea "${this.data.question}", puedes ver esta tarea en el tablero "${this.columnasService.nombreTablero}" haciendo click en el bot??n "VER TAREA".</p></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:552px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><!--[if mso]><a href="http://localhost:4200/tablero/1" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="http://localhost:4200/tablero/1" 
                style="height:41px; v-text-anchor:middle; width:173px" arcsize="0%" strokecolor="#ffffff" strokeweight="3px" fillcolor="#530402">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:Montserrat, helvetica, arial, sans-serif; font-size:15px; font-weight:700; line-height:15px;  mso-text-raise:1px'>VER TAREA</center>
	</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#FFFFFF;background:#530402;border-width:3px;display:inline-block;border-radius:0px;width:auto;mso-hide:all"><a href="http://localhost:4200/login" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#530402;border-width:10px 30px 10px 30px;display:inline-block;background:#530402;border-radius:0px;font-family:Montserrat, helvetica, arial, sans-serif;font-weight:bold;font-style:normal;line-height:22px;width:auto;text-align:center">VER TAREA</a></span><!--<![endif]--></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;border-top:4px solid #ffffff;border-right:4px solid #ffffff;border-left:4px solid #ffffff;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:30px;padding-bottom:30px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:592px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-p20r es-m-p20l" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:18px;color:#0b5394;font-size:12px">An??lisis de Sistemas II ?? 2022 Grupo 2, Inc. All Rights Reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:18px;color:#0b5394;font-size:12px">Universidad Mariano Galvez de Guatemala</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFE7F3;border-right:4px solid #ffffff;border-left:4px solid #ffffff;width:600px;border-bottom:4px solid #ffffff">
             <tr>
              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:552px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>
      `
    }
    this.envioCorreo.enviarCorreo(datosCorreo).subscribe(res => {});
  }
}

function ngOnInit() {
  throw new Error('Function not implemented.');
}
function saveChanges() {
  throw new Error('Function not implemented.');
}

function enviarCorreoTareaAsignada(email: any, any: any) {
  throw new Error('Function not implemented.');
}
