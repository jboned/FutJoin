import {Component, OnInit} from '@angular/core';
import {ComplejoDeportivoService} from '../services/complejo_deportivo.service';
import { User } from '../models/user';
import { ComplejoDeportivo } from '../models/complejodeportivo';
import {GLOBAL} from '../services/global';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from  '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'complejos-deportivos',
  templateUrl: './complejos-deportivos.html',
  //styleUrls: ['./create-complejo.component.css'],
  providers:[ComplejoDeportivoService]
})

export class ComplejosDeportivosComponent implements OnInit{
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  public userComplejo: User;
    public complejo: ComplejoDeportivo;
    public message;

    constructor(
      private _complejoService:ComplejoDeportivoService,
      private toastr: ToastrService
    ){
      this.userComplejo = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
      this.complejo = new ComplejoDeportivo('',null);
    }

}
