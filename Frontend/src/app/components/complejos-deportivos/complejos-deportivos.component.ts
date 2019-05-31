import {Component, OnInit, ViewChild} from '@angular/core';
import {ComplejoDeportivoService} from '../../services/complejo_deportivo.service';
import { User } from '../../models/user';
import { ComplejoDeportivo } from '../../models/complejodeportivo';
import {GLOBAL} from '../../services/global';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from  '@angular/common/http';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'complejos-deportivos',
  templateUrl: './complejos-deportivos.component.html',
  styleUrls: ['./complejos-deportivos.component.css'],
  providers:[ComplejoDeportivoService]
})

export class ComplejosDeportivosComponent implements OnInit{

    public identity;
    public token;
    public message;
    public url;
    public complejos: ComplejoDeportivo[] = [];

    @ViewChild('carousel') carousel:any;


    options : Object = {
        clicking: true,
        sourceProp: 'src',
        visible: 3,
        perspective: 3,
        startSlide: 0,
        border: 0,
        dir: 'ltr',
        width: 800,
        height: 469,
        space: 300,
        autoRotationSpeed: 50000,
        loop: true,
        controls: true
    }



    constructor(
      private _complejoService:ComplejoDeportivoService,
      private toastr: ToastrService,
      private _userService:UserService,
    ){
      //LocalStorage
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.getComplejos().subscribe(_=>{;
        console.log(this.complejos);
      });
    }
    ngOnInit(){}

    goNext(){
      this.carousel.goNext();
    }


    getComplejos(){
      return this._complejoService.getComplejos().map(
        (complejos) => {
          if(complejos.length==0){
            this.message = "No hay complejos deportivos.";
            this.showToaster();
          }else{
            this.complejos = complejos.complejos;
          }
        })
       .catch((error) => {
          console.log('error ' + error);
          throw error;
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
  }
