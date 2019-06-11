import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Partido } from 'src/app/models/partido';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';


@Component({
    selector: 'create-partido',
    templateUrl: 'create-partido.component.html',
    styleUrls: ['./create-partido.component.css'],
  })
  export class CreatePartidoComponent{
    //Parametros de sesion.
     public identity;
     public token;
     public message;
     public url;
     public partido :Partido;
     selected = 1;


    constructor(
      private _userService:UserService,
      private toastr: ToastrService,
      public dialogRef: MatDialogRef<CreatePartidoComponent>, @Inject(MAT_DIALOG_DATA) data) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.partido = data;

      }

    onSubmit() {
        this.partido.creador = this.identity;
        this.partido.jugadores = [this.identity];
        switch(this.partido.campo.tipo){
          case 1:
            this.partido.maxJugadores = 14;
            break;
          case 2:
            this.partido.maxJugadores = 22;
            break;
          case 3:
            this.partido.maxJugadores = 10;
            break;
        }
        this.dialogRef.close(this.partido);
    }

    close() {
        this.partido.tipo = 3;
        this.dialogRef.close();
    }
}
