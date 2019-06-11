import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Partido } from 'src/app/models/partido';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';


@Component({
    selector: 'faq',
    templateUrl: 'faq.component.html',
    styleUrls: ['./faq.component.css'],
  })

  export class FAQComponent{
    //Parametros de sesion.
     public identity;
     public token;
     public message;
     public url;

     public preguntas = [];
     public respuestas = [];

    constructor(
      private _userService:UserService,
      private toastr: ToastrService) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.preguntas = [
          '¿Qué es FutJoin?',
          '¿Cómo funciona FutJoin?',
          '¿Como puedo reservar el campo?',
          '¿Qué es un partido privado?',
          '¿Qué es un partido público?',
          '¿Puedo invitar a mis amigos al partido?',
          '¿Puedo pasar mi partido de privado a público?'
        ]
        this.respuestas = [
          'FutJoin es una aplicación web desarrollada en Angular 7 para organizar partidos de fútbol amateur. Está desarrollada como Trabajo de Fin de Grado de Ingeniería del Software en la Universidad de Málaga por Javier Boned.',
          'Es muy sencillo, el objetivo principal de FutJoin es que el usuario pueda reservar campos de fútbol en los distintos complejos deportivos de Málaga de forma rápida y eficaz.',
          'Diríjase al menú "Complejos Deportivos" que encontrará en la barra vertical de la izquierda, pulse en el tipo de fútbol que desea que sea el partido, elija el campo que usted quiera, seleccione la hora que prefiera y cree el partido.',
          'Si usted crea un partido privado, solo se podrán unir jugadores por invitación.',
          'Si usted crea un partido público, se podrá unir el usuario que lo desee, sin necesidad de ninguna invitación',
          'Claro que sí. El único requisito será que sus amigos también tengan una cuenta en FutJoin. Crea un partido privado e invita a tus amigos desde el menú "Mis partidos".',
          'Sí. Así, si no sois suficientes para el partido, el creador del partido podrá poner el partido público y cualquier persona que quiera jugar con vosotros se pueda unir.'
        ];
      }

    }
