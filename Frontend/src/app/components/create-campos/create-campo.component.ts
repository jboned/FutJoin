
import {Component, OnInit} from '@angular/core';
import { Campo} from '../../models/campo'
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'campos',
    styleUrls: ['campos.component.css'],
    templateUrl: 'campos.component.html',
  })

  export class CreateCampo implements OnInit{

    public identity;
    public token;
    public message;
    public url;
    public campo: Campo;

    constructor (
      private _userService:UserService,
      private toastr: ToastrService,
    
    ){
      
    }
    ngOnInit(): void {};

  }
  
  
