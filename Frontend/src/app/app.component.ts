import { Component, OnInit } from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service'
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from  '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
  animations:[
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
       // animate('0.5s 300ms ease-in')
       animate('0.3s ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('changeDivSize', [
      state('login', style({
        height:'280px',
        width:'400px',
        backgroundColor:	'#F3F5F4'
      })),
      state('register', style({
        height:'400px',
        width:'700px',
        backgroundColor:'#F3F5F4'
      })),
      transition('login=>register', animate('1000ms')),
      transition('register=>login', animate('1000ms'))
    ]),


  ]
})

export class AppComponent implements OnInit{
  public title = 'FutJoin';

  public user: User;
  public identity;
  public token;

  public userRegister: User;

  public errorMessage;
  public estado;



  constructor(
    private _userService:UserService,
    private toastr: ToastrService
  ){
    this.user = new User('', '', '', '', '', '', '', '', 0, '', '', 0, 0);
    this.userRegister = new User('', '', '', '', '', '', '', '', 0, '', '', 0, 0);
    this.estado = "login";
  }


  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  showToaster(){

    this.toastr.error(this.errorMessage,'Error',{
      progressBar : true,
      closeButton: true,
      positionClass: 'toast-top-center',
    });
  }



  public onSubmit() {

    this._userService.signup(this.user).subscribe(
        response => {
          let identity = response.user;
          this.identity = identity;
          if(!this.identity._id){
            this.errorMessage = "El usuario no está correctamente identificado";
          }else{
            //Guardo la sesion
            localStorage.setItem('identity',JSON.stringify(identity));
            //Conseguir token
            this._userService.signup(this.user,'true').subscribe(
              response => {
                  let token = response.token;
                  this.token = token;
                  if(this.token.length<=0){
                    this.errorMessage = "El token no se ha generado correctamente";
                    this.showToaster();
                  }else{
                    localStorage.setItem('token',token);
                    this.user = new User('', '', '', '', '', '', '', '', 0, '', '', 0, 0);
                  }
              },
              (error: HttpErrorResponse) =>{
                this.errorMessage = error.error.message;
                this.showToaster();
              }
            );
          }
        },
        (error: HttpErrorResponse) =>{

          this.errorMessage = error.error.message;
          this.showToaster();
        }
    );
  }

  public logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  public onRegisterSubmit(){

  }


}
