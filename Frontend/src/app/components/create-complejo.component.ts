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
    public message;
    public identity;
    public token;

    constructor(
      private _complejoService:ComplejoDeportivoService,
      private _userService:UserService,
      private toastr: ToastrService
    ){
      this.userComplejo = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
      this.complejo = new ComplejoDeportivo('',null);

      //LocalStorage
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

    }

    ngOnInit(): void {

    }

    complejoOnSubmit(){
      this.complejo.propietario = this.userComplejo;
      this._complejoService.register(this.complejo).subscribe(
        response => {
          this.message="Usuario y complejo creados correctamente";
          this.showToasterBueno();
        });
        this.userComplejo= new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
        this.complejo = new ComplejoDeportivo('',null);
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
