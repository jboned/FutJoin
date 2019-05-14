import { Component, OnInit,ViewChild} from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service'
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from  '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {GLOBAL} from './services/global';
import {MatSidenav} from '@angular/material';



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
        width:'850px',
        backgroundColor:'#F3F5F4'
      })),
      transition('login=>register', animate('500ms')),
      transition('register=>login', animate('500ms'))
    ]),


  ]
})

export class AppComponent implements OnInit{
  public title = 'FutJoin';

  //SideNav
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  opened = false;


  //Login.
  public user: User;
  public identity;
  public token;

  //Registro.
  public userRegister: User;
  isLinear = true;

  //Otros.
  public message;
  public estado;

  public minDate;
  public maxDate;

  public url;


  constructor(
    private _userService:UserService,
    private toastr: ToastrService
  ){
    this.user = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
    this.userRegister = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
    this.estado = "login";

    this.url = GLOBAL.url;

    this.minDate = new Date(1900,0,1);
    this.maxDate = new Date();
  }


  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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



  public onSubmit() {

    this._userService.signup(this.user).subscribe(
        response => {

          let identity = response.user;
          this.identity = identity;

          if(!this.identity._id){
            this.message = "El usuario no está correctamente identificado";
          }else{
            //Guardo la sesion
            localStorage.setItem('identity',JSON.stringify(identity));
            this.message="Login correcto.";
            this.showToasterBueno();
            //Conseguir token
            this._userService.signup(this.user,'true').subscribe(
              response => {
                  let token = response.token;
                  this.token = token;
                  if(this.token.length<=0){
                    this.message = "El token no se ha generado correctamente";
                    this.showToaster();
                  }else{
                    localStorage.setItem('token',token);
                    this.user = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
                  }
              },
              (error: HttpErrorResponse) =>{
                this.message = error.error.message;
                this.showToaster();
              }
            );
          }
        },
        (error: HttpErrorResponse) =>{

          this.message = error.error.message;
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
   console.log(this.userRegister);
    this._userService.register(this.userRegister).subscribe(
      response => {
       let user = response.user;
       this.userRegister = user;

        if(!user._id){
          this.message = "Error al registrarse";
          this.showToaster();
        }else{
          this.message="El registro se ha realizado correctamente."
          this.showToasterBueno();
          this.userRegister = new User('', '', '', '', '', '', '',0,null,'', '', '', 0, 0 );
          this.estado = "login";
        }
      },
      (error:HttpErrorResponse)=>{
        this.message = error.error.message;
        this.showToaster();
      });
  }


}
