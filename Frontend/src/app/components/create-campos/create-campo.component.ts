
import {Component, OnInit} from '@angular/core';
import { Campo } from '../../models/campo'
import { ComplejoDeportivo } from '../../models/complejodeportivo'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplejoDeportivoService } from 'src/app/services/complejo_deportivo.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { CampoService } from 'src/app/services/campo.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'create-campo',
    styleUrls: ['create-campo.component.css'],
    templateUrl: 'create-campo.component.html',
  })

  export class CreateCampoComponent implements OnInit{

    //Parametros sesion
    public identity;
    public token;
    public message;
    public url;

    //Parametros componente
    public subida:Boolean;
    public campo: Campo;
    public complejo: ComplejoDeportivo;
    public dataLoaded = false;

    //Parametros url
    public idComplejo;
    public tipo;
    public campoId;


    constructor (
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private _complejoDeportivoService:ComplejoDeportivoService,
      private _userService:UserService,
      private _campoService: CampoService,
      private router: Router,
    ){
      this.url = GLOBAL.url;
      this.subida = false;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

    }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.campoId = params['campo_id'];
        if(this.campoId){
          this._campoService.getCampo(this.campoId).subscribe(
            response => {
              this.campo = response.campo;
              console.log(this.campo);
              this.subida = true;
            },
            (error:HttpErrorResponse)=>{
              this.message = error.error.message;
              this.showToaster();
            }
          );
        }else{
          this.idComplejo = params['complejo_id'];
          this.tipo = parseInt(params['tipo'],10);
          this._complejoDeportivoService.getComplejo(this.idComplejo).subscribe(
            response => {
              if(!response.complejo){
                this.message="No se ha encontado el complejo";
                this.showToaster;
              }else{
                this.campo = new Campo('','',0,0,0,'',0,false,null,'');
                this.campo.complejo = response.complejo;
                this.campo.tipo = this.tipo;
              }
            },
            (error: HttpErrorResponse) =>{
              this.message = error.error.message;
              this.showToaster();
            }
          );
        }
      });
      this.dataLoaded = true;
    }

    onSubmit(){
      if(!this.campo._id){
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
        }else{
          this._campoService.update(this.campo,this.campo.complejo.propietario._id).subscribe(
            response => {
              this.message = 'Campo actualizado correctamente';
              this.showToasterBueno();
              this.router.navigate(['../../campos/'+this.campo.complejo._id+'/'+this.campo.tipo], { relativeTo: this.route });
            },
            (error:HttpErrorResponse) => {
              this.message = error.error.message;
              this.showToaster();

            });
        }
    }


    subirImagen(){
      let url = this.url + 'campos/upload-image-campo/'+ this.campo._id;
      this.makeFileRequest(url,[],this.filesToUpload).then(
        (result:any) => {
          this.campo.image = result.image;
          this.message= "La imagen del campo se ha cambiado correctamente.";
          this.showToasterBueno();
          console.log(this.campo);
         // this.router.navigate(['../../../campos/'+this.campo.complejo._id+'/'+this.campo.tipo], { relativeTo: this.route });
        }).catch(e =>{
          this.showToaster();
          this.message = e.message;
        })
    }

    public filesToUpload: Array<File> = null;

    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      this.subida = true;
    }

    makeFileRequest(url: string, params: Array<string>, files:Array<File>){
      var token  = this.token;

      return new Promise(function(resolve, reject){
        var formData:any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i = 0; i< files.length; i++){
          formData.append('image',files[i], files[i].name);
        }
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Authorization',token);
        xhr.responseType = 'json'
        xhr.send(formData);

        xhr.onload = function (){
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(xhr.response);
            }
          }else{
            reject({message: "Error al introducir imagen"});
          }
        }
      });
    }


    redirect(){
      this.router.navigate(['complejos/campos'], {queryParams: {complejo_id : this.campo.complejo._id, tipo: this.campo.tipo},skipLocationChange:true});
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


