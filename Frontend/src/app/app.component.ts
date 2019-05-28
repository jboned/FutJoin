import { Component, OnInit,ViewChild, Inject, ElementRef} from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service'
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from  '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {GLOBAL} from './services/global';
import {MatSidenav} from '@angular/material';
import { Router } from '@angular/router';




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
    trigger('changeDivSize', [
      state('login', style({
        height:'280px',
        width:'400px',
        backgroundColor:	'#F3F5F4'
      })),
      state('register', style({
        height:'320px',
        width:'850px',
        backgroundColor:'#F3F5F4'
      })),
      transition('login=>register', animate('500ms')),
      transition('register=>login', animate('500ms'))
    ]),
    trigger('changeSidenav', [
      state('1', style({
        width:'60px'
      })),
      state('2', style({
        width:'250px'
      })),
      transition('1<=>2', animate('200ms')),
    ])
  ]
})

export class AppComponent implements OnInit{
  public title = 'FutJoin';

  //SideNav
  @ViewChild(MatSidenav) sidenav: MatSidenav;


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
  public inicio;
  public url;
  public vari = '1';
  @ViewChild('container') private _container;
  public showMenu: boolean = false;




  constructor(
    private _userService:UserService,
    private toastr: ToastrService,
    public router: Router,
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
    this.inicio = true;
  }




  public onSubmit() {
    console.log(this.user);
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
                    this.router.navigate(['home']);
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
    this.inicio = "false";
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

expandir(){
  if(this.vari == '1'){
    this.vari = '2';
  }else{
    this.vari = '1';
  }
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
