import { Component, OnInit } from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'FutJoin';
  public user: User;
  public identity;
  public token;
  public errorMessage;


  constructor(
    private _userService:UserService
  ){
    this.user = new User('', '', '', '', '', '', '', '', 0, '', '', 0, 0);
  }


  ngOnInit(){

  }



  public onSubmit() {

    this._userService.signup(this.user).subscribe(
        response => {
          console.log(response);
        },
        error =>{
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;

        }
    );
  }


}
