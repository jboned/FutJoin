import { Component } from '@angular/core';
import {User} from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FutJoin';
  public user: User;
  public identity;
  public token;


  constructor() {
    this.user = new User('', '', '', '', '', '', '', '', 0, '', '', 0, 0);
  }

  public onSubmit() {
    console.log(this.user);
  }
}
