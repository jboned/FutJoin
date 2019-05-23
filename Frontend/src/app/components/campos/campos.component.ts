
import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Campo} from '../../models/campo'
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'campos',
    styleUrls: ['campos.component.css'],
    templateUrl: 'campos.component.html',
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  })

  export class CamposComponent implements OnInit{

    public identity;
    public token;
    public message;
    public url;
    
    dataSource: Campo[];
    columnsToDisplay = ['nombre', 'largo', 'ancho', 'tipo'];
    expandedElement: Campo | null;

    constructor (
      private _userService:UserService,
      private toastr: ToastrService,
    
    ){
      
    }
    ngOnInit(): void {};


  }
  
  
