import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Partido } from 'src/app/models/partido';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';
import { PartidoService } from 'src/app/services/partido.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JugadoresComponent } from '../jugadores/jugadores.component';



@Component({
    selector: 'mis-partidos',
    templateUrl: 'mis-partidos.html',
    styleUrls: ['./mis-partidos.css'],
    encapsulation: ViewEncapsulation.None
  })

  export class MisPartidosComponent{
    //Parametros de sesion.
     public identity;
     public message;
     public noticias;
     public token;

     //Lista de partidos
     public partidosParticipante = [];
     public partidosParticipantePagin = [];
     pageParticipante = 0;
     sizeParticipante = 5;

     public partidosCreador = [];
     public partidosCreadorPagin = [];
     pageCreador = 0;
     sizeCreador = 5;

     //Hora.
     hoy = new Date();

    constructor(
      private _userService:UserService,
      private _partidoService:PartidoService,
      private toastr:ToastrService,
      public dialog: MatDialog,
      ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();

        this._partidoService.getPartidosByJugadorParticipante(this.identity._id).subscribe(
          result => {
            this.partidosParticipante = result.partidos;
            this.getDataParticipante({pageIndex: this.pageParticipante, pageSize: this.sizeParticipante});

          },
          (error:HttpErrorResponse) => {
            this.message = error.error.message;
            this.showToaster();
          }
        );
        this._partidoService.getPartidosByJugadorCreador(this.identity._id).subscribe(
          result => {
            this.partidosCreador = result.partidos;
            console.log(this.partidosCreador);
            this.getDataCreador({pageIndex: this.pageCreador, pageSize: this.sizeCreador});
          },
          (error:HttpErrorResponse) => {
            this.message = error.error.message;
            this.showToaster();
          }
        );
      }


    openDialogJugadores(ele): void {

      const dialogRef = this.dialog.open(JugadoresComponent, {
        width: '600px',
        height:'600px',
        data: {jugadores:ele.jugadores, creador:ele.creador},
        autoFocus:true,
      });

      dialogRef.afterClosed().subscribe();
  }

      getDataCreador(obj) {
        let index=0,
            startingIndex=obj.pageIndex * obj.pageSize,
            endingIndex=startingIndex + obj.pageSize;

        this.partidosCreadorPagin = this.partidosCreador.filter(() => {
          index++;
          return (index > startingIndex && index <= endingIndex) ? true : false;
        });
      }
      getDataParticipante(obj) {
        let index=0,
            startingIndex=obj.pageIndex * obj.pageSize,
            endingIndex=startingIndex + obj.pageSize;

        this.partidosParticipantePagin = this.partidosParticipante.filter(() => {
          index++;
          return (index > startingIndex && index <= endingIndex) ? true : false;
        });
      }

      showToaster(){
        this.toastr.error(this.message,'Error',{
          progressBar : true,
          closeButton: true,
          positionClass: 'toast-top-center',
          timeOut: 3000
        });
      }
      showToasterBueno(){
        this.toastr.success(this.message,'Éxito',{
          progressBar : true,
          closeButton: true,
          positionClass: 'toast-top-center',
          timeOut: 2500
        });
      }
      getHora(fecha){
        return fecha.substring(11,16);
      }
      getDia(partido){
        let dia = partido.substring(0,10).split('-');
        return dia[2]+"/"+dia[1]+"/"+dia[0];
      }
      fecha(fecha){
        return new Date(fecha);
      }
      haTerminado(fechaFin){
        return this.hoy.getTime() > (this.fecha(fechaFin).getTime() + this.fecha(fechaFin).getTimezoneOffset()*60000);
      }
      porEmpezar(fechaInicio){
       return this.fecha(fechaInicio).getTime() + this.fecha(fechaInicio).getTimezoneOffset()*60000 > this.hoy.getTime();
      }
      enCurso(fechaInicio, fechaFin){
        return this.hoy.getTime() > (this.fecha(fechaInicio).getTime() + this.fecha(fechaInicio).getTimezoneOffset()*60000) && (this.fecha(fechaFin).getTime() + this.fecha(fechaFin).getTimezoneOffset()*60000>this.hoy.getTime())
      }
    }
