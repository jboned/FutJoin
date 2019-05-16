import {Component, OnInit} from '@angular/core';
import {ComplejoDeportivoService} from '../services/complejo_deportivo.service';
import { User } from '../models/user';
import { ComplejoDeportivo } from '../models/complejodeportivo';
import {GLOBAL} from '../services/global';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from  '@angular/common/http';
import { UserService } from '../services/user.service';


@Component({
    selector: 'complejo-create',
    templateUrl: './create-complejo.component.html',
    styleUrls: ['./create-complejo.component.css'],
    providers:[ComplejoDeportivoService]
})

export class CreateComplejoComponent implements OnInit{
    public userComplejo: User;
    public complejo: ComplejoDeportivo;
    public identity;
    public token;
    public tokenu;
    public url;
    public message;

    constructor(
      private _complejoService:ComplejoDeportivoService,
      private _userService: UserService,
      private toastr: ToastrService
    ){
      this.userComplejo = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
      this.complejo = new ComplejoDeportivo('',null);
      this.url = GLOBAL.url;
    }

    ngOnInit(): void {
      this.identity = this._complejoService.getIdentity();
      this.token = this._complejoService.getToken();
    }

    complejoOnSubmit(){
      this.complejo.propietario = this.userComplejo;
      this._complejoService.register(this.complejo).subscribe(
        response => {
          this.message="Usuario y complejo creados correctamente";
          this.showToasterBueno();
        });

          let useraux = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
          useraux.email= this.userComplejo.email;
          useraux.password= this.userComplejo.password;

        this._userService.signup(useraux).subscribe(
            response => {
              console.log(response);
              this.userComplejo = response.user;

              this._userService.signup(useraux,true).subscribe(
                response => {
                  this.tokenu = response.token;
                  let url = this.url + 'upload-image-user/'+ this.userComplejo._id;
                  this.makeFileRequest(url,[],this.filesToUpload).then(
                  (result:any) => {
                      this.userComplejo.image = result.image;
                      this.userComplejo = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
                      this.complejo = new ComplejoDeportivo('',null);
                  }).catch(e =>{
                      this.message = e.message;
                      this.showToaster();
                  });
                },
                (error: HttpErrorResponse) =>{
                  this.message = error.error.message;
                  this.showToaster();
              });

            },(error: HttpErrorResponse) =>{
              this.message = error.error.message;
              this.showToaster();
        });


    }


    public filesToUpload: Array<File> = null;

    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files:Array<File>){
      var token  = this.tokenu;

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
