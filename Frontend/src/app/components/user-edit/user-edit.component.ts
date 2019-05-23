import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from  '@angular/common/http';


import {User} from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import {GLOBAL} from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    providers:[UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user: User;
    public identity;
    public token;

    //Para fecha
    public minDate;
    public maxDate;


    public message;
    public url;


    constructor(
        private _userService:UserService,
        private toastr: ToastrService
    ){
        //LocalStorage
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();

        this.user = this.identity;

        this.titulo= 'Mis datos';

        this.minDate = new Date(1900,0,1);
        this.maxDate = new Date();
        this.url = GLOBAL.url;


    }

    ngOnInit(){
    }

    onSubmit(){
      this._userService.updateUser(this.user).subscribe(
        response => {

          if(!response.user){
            this.message= "El usuario no ha sido actualizado";
            this.showToaster();
          }else{

            localStorage.setItem('identity', JSON.stringify(this.user));

            if(!this.filesToUpload){
              this.message= "El usuario se ha actualizado correctamente.";
              this.showToasterBueno();
            }else{
              let url = this.url + 'upload-image-user/'+ this.user._id;
              this.makeFileRequest(url,[],this.filesToUpload).then(
                (result:any) => {
                  this.user.image = result.image;
                  localStorage.setItem('identity', JSON.stringify(this.user));
                  this.message= "El usuario se ha actualizado correctamente.";
                  this.showToasterBueno();
                }).catch(e =>{
                  this.showToaster();
                  this.message = e.message;
                })
              }
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

    public filesToUpload: Array<File> = null;

    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
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


}
