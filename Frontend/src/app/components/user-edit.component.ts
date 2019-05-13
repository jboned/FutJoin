import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

import {User} from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    //styleUrls: ['./app.component.css'],
    providers:[UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user: User;
    public identity;
    public token;

    constructor(
        private _userService:UserService
    ){
        this.user = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
        
        this.titulo= 'Mis datos';

        //LocalStorage
        this.identity = this._userService.getIdentity;
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        console.log('componente cargado');
    }
}
