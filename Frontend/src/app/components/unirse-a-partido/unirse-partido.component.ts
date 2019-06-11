import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Partido } from 'src/app/models/partido';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';


@Component({
    selector: 'unirse-partido',
    templateUrl: 'unirse-partido.component.html',
    styleUrls: ['./unirse-partido.component.css'],
  })

  export class UnirsePartidoComponent{
    //Parametros de sesion.
     public identity;
     public token;
     public message;
     public url;

     public partido :Partido;
     dia;
     horaInicio;
     horaFin;
     public lleno:Boolean;
     public estoy: Boolean;


    constructor(
      private _userService:UserService,
      private toastr: ToastrService,
      public dialogRef: MatDialogRef<UnirsePartidoComponent>, @Inject(MAT_DIALOG_DATA) data) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.partido = data.partido;
        this.dia = this.getDia(this.partido.dia);
        this.horaInicio = this.getHora(this.partido.fechaInicio);
        this.horaFin = this.getHora(this.partido.fechaFin);
        if( this.partido.jugadores.length >= this.partido.maxJugadores){
          this.lleno = true;
        }
        this.estoy = this.yaEstoy();
      }



    close() {
        this.dialogRef.close();
    }

    getDia(partido){
      let dia = partido.substring(0,10).split('-');
      return dia[2]+"/"+dia[1]+"/"+dia[0];
    }
    getHora(fecha){
      return fecha.substring(11,16);
    }

    yaEstoy(){
      let ids = this.partido.jugadores.map(function(jugador){
        return jugador._id;
      });
      if(ids.includes(this.identity._id)){
        return true;
      }else{
        return false;
      }

    }

    join(){
      this.dialogRef.close(this.partido);
    }
}
