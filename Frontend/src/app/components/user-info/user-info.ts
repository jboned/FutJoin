import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'user-info',
    templateUrl: 'user-info.html',
    styleUrls: ['./user-info.css'],
  })

  export class UserInfo{
    //Parametros de sesion.
     public usuario;
     public message;
     public url;

    constructor(
      private _userService:UserService,
      private toastr: ToastrService,
      private route: ActivatedRoute) {
        this.url = GLOBAL.url;
        this.route.queryParams.subscribe(params => {
          let id = params['id'];
          this._userService.getUser(id).subscribe(
            response => {
              this.usuario = response.user;
              console.log(this.usuario);
            },
            (error:HttpErrorResponse)=>{
              this.message = error.error.message;
              this.showToaster();
            }
          );
        });
      }

      getFecha(fecha){
        return new Date(fecha).toLocaleDateString();
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
