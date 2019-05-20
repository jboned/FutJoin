import {Component, OnInit} from '@angular/core';
import {ComplejoDeportivoService} from '../services/complejo_deportivo.service';
import { User } from '../models/user';
import { ComplejoDeportivo } from '../models/complejodeportivo';
import {GLOBAL} from '../services/global';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from  '@angular/common/http';
import { UserService } from '../services/user.service';

import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'complejos-deportivos',
  templateUrl: './complejos-deportivos.component.html',
  styleUrls: ['./complejos-deportivos.component.css'],
  providers:[ComplejoDeportivoService]
})

export class ComplejosDeportivosComponent implements OnInit{
    public complejos: ComplejoDeportivo[];
    public identity;
    public token;
    public message;
    public url;


    constructor(
      private _complejoService:ComplejoDeportivoService,
      private toastr: ToastrService,
      private _userService:UserService,
      private _sanitizer: DomSanitizer
    ){
      //LocalStorage
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
    }

    ngOnInit(){
      this.getComplejos();
    }

    getComplejos(){
      this._complejoService.getComplejos().subscribe(
        response=>{
          var complejos = response.complejos;
          if(complejos.length==0){
            this.message = "No hay complejos deportivos.";
            this.showToaster();
          }else{
            this.complejos = complejos;
          }
        },
        (error: HttpErrorResponse) =>{
          this.message = error.error.message;
          this.showToaster();
        }
      );
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

    getImage(complejo){
      let vari = this.url + 'get-image-user/' + complejo.propietario.image

      let sano = this._sanitizer.bypassSecurityTrustStyle('url('+vari+')');

      return sano;
    }

  }
