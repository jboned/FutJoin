import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Partido } from 'src/app/models/partido';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';
import { NoticiasService } from 'src/app/services/noticias.service';


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: [],
  })

  export class homeComponent{
    //Parametros de sesion.
     public identity;
     public message;
     public noticias;

    constructor(
      private _userService:UserService,
      private _noticiasService:NoticiasService) {
        this.identity = this._userService.getIdentity();
        this._noticiasService.getNoticias().subscribe(
          noticias => {
            this.noticias = noticias.noticias;
            console.log(this.noticias);
          }
        );
      }

    }
