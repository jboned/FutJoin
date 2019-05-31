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
  
    constructor(
      private _userService:UserService,
      private toastr: ToastrService,
      public dialogRef: MatDialogRef<CreatePartidoComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.partido = data;
        console.log(this.partido);
        console.log(this.partido['campo']['complejo']['propietario'].nombre);
      }
  
    onNoClick(): void {
      this.dialogRef.close(/*this.form.value*/);
    }
}