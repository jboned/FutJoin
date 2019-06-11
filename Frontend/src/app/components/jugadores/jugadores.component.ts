import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Partido } from 'src/app/models/partido';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';
import { Router } from '@angular/router';


@Component({
    selector: 'jugadores',
    templateUrl: 'jugadores.component.html',
    styleUrls: ['./jugadores.component.css'],
  })
  export class JugadoresComponent{
    //Parametros de sesion.
     public identity;
     public token;
     public message;
     public url;
     public jugadores;
     public creador;
     @ViewChild('carousel') carousel:any;

     options : Object = {
      clicking: false,
      sourceProp: 'src',
      visible: 1,
      perspective: 0,
      startSlide: 0,
      border: 0,
      dir: 'ltr',
      width: 500,
      height: 500,
      space: 0,
      autoRotationSpeed: 100000000000,
      loop: true,
      controls: true
  }



    constructor(
      private _userService:UserService,
      private toastr: ToastrService,
      private router: Router,
      public dialogRef: MatDialogRef<JugadoresComponent>, @Inject(MAT_DIALOG_DATA) data) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.jugadores = data.jugadores;
        this.creador = data.creador;
        console.log(this.jugadores);
      }


    close() {
        this.dialogRef.close();
    }

    perfil(idjug){
      this.router.navigate(['user'], {queryParams: { id: idjug }});
      this.close();
    }
}
