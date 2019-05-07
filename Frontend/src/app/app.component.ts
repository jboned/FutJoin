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
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]
})

export class AppComponent implements OnInit{
  public title = 'FutJoin';
  public user: User;
  public identity;
  public token;
  public errorMessage;


  constructor(
    private _userService:UserService,
    private toastr: ToastrService
  ){
    this.user = new User('', '', '', '', '', '', '', '', 0, '', '', 0, 0);
  }


  ngOnInit(){

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

            //Conseguir token
            this._userService.signup(this.user,'true').subscribe(
              response => {
                  let token = response.token;
                  this.token = token;
                  if(this.token.length<=0){
                    this.errorMessage = "El token no se ha generado correctamente";
                    this.showToaster();
                  }else{
                    console.log(token);
                    console.log(identity);
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


}
