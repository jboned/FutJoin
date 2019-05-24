
import {Component, OnInit} from '@angular/core';
import { Campo } from '../../models/campo'
import { ComplejoDeportivo } from '../../models/complejodeportivo'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ComplejoDeportivoService } from 'src/app/services/complejo_deportivo.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { CampoService } from 'src/app/services/campo.service';

@Component({
    selector: 'create-campo',
    styleUrls: ['create-campo.component.css'],
    templateUrl: 'create-campo.component.html',
  })

  export class CreateCampoComponent implements OnInit{

    public identity;
    public token;
    public message;
    public url;
    public campo: Campo;
    public complejo: ComplejoDeportivo;
    
    public idComplejo;
    public tipo;


    constructor (
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private _complejoDeportivoService:ComplejoDeportivoService,
      private _campoService: CampoService
    ){
      this.campo = new Campo('',0,0,0,'',0,false,null,'');
      
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.idComplejo = params['complejo_id'];
        this.tipo = parseInt(params['tipo'],10);
        });
      this._complejoDeportivoService.getComplejo(this.idComplejo).subscribe(
        response => {
          if(!response.complejo){
            this.message="No se ha encontado el complejo";
            this.showToaster;
          }else{
            this.complejo = response.complejo;
          }
        },
        (error: HttpErrorResponse) =>{
          this.message = error.error.message;
          this.showToaster();
        }
      );
    }

    onSubmit(){
      this.campo.complejo = this.complejo;
      this.campo.tipo = this.tipo;
      console.log("algo");
      this._campoService.create(this.campo).subscribe(
        response => {
         let campo = response.campo;

          if(!campo._id){
            this.message = "Error al crear campo";
            this.showToaster();
          }else{
            this.message="Campo creado correctamente"
            this.campo = campo;
            this.showToasterBueno();
          }
        },
        (error:HttpErrorResponse)=>{
          this.message = error.error.message;
          this.showToaster();
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
 
  
