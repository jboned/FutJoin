import {Component, OnInit, ViewChild, ElementRef, Inject, HostListener} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';
import { MatDialog } from '@angular/material/dialog';
import { Partido } from 'src/app/models/partido';
import { CreatePartidoComponent } from '../create-partido/create-partido.component';
import { ActivatedRoute } from '@angular/router';
import { CampoService } from 'src/app/services/campo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'partidos',
    styleUrls: ['partidos.component.css'],
    templateUrl: 'partidos.component.html'
  })

  export class PartidosComponent implements OnInit{

     //Parametros de sesion.
     public identity;
     public token;
     public message;
     public url;

     //Arrays para dias y horas.
     public days = ['Lu','Mar','Mi','Ju','Vi','Sa','Do'];
     public semana = [];
     public hoy = new Date();
     public horas=["09:00 - 10:00","10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00", "14:00 - 15:00",
                   "15:00 - 16:00","17:00 - 18:00","18:00 - 19:00","19:00 - 20:00","21:00 - 22:00","22:00 - 23:00"];
    
    //Informacion campo partidos.
    public campoId;
    public campo;

    constructor (
      private _userService:UserService,
      private toastr: ToastrService,
      public dialog: MatDialog,
      private route: ActivatedRoute,
      private _campoService: CampoService
    ){
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        
        this.campoId = params['campo_id'];
        //console.log(this.campoId);
        this._campoService.getCampo(this.campoId).subscribe(
          response => {
            this.campo = response.campo;
            //console.log(this.campo);
          },
          (error:HttpErrorResponse)=>{
            this.message = error.error.message;
            this.showToaster();
          }
        );
      }); 
      this.semana = this.getDias(this.hoy); 
    }


    openDialog(): void {
      const dialogRef = this.dialog.open(CreatePartidoComponent, {
        width: '1000px',
        height:'600px',
        data: {campo: this.campo},
        autoFocus:true,
  
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //partido = result
      });
    }





    getDias(hoy){
      let dias = Array(7);
      let number_hoy = hoy.getDay(); //0 domingo, 6 sabado.
      let hoy_date = hoy.getDate();

      switch(number_hoy){
        case 0:
          dias[6] = hoy.toLocaleDateString();
          number_hoy = 6;
          break;
        default:
          number_hoy = number_hoy-1;
          dias[number_hoy] = hoy.toLocaleDateString();
      }

      for(var i = number_hoy-1; i>=0;i--){
        let dia2 = new Date();
        dia2.setDate(hoy_date-(number_hoy-i));
        dias[i] = dia2.toLocaleDateString();
      }

      for(var j = number_hoy+1; j<=6;j++){
        let dia2 = new Date();
        dia2.setDate(hoy_date+(j-number_hoy));
        dias[j] = dia2.toLocaleDateString();
      }
      return dias;
    }

    redirect_atras(){
      
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
