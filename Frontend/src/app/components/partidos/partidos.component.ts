import {Component, OnInit, ViewChildren, Renderer2, RendererStyleFlags2} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from 'src/app/services/global';
import { MatDialog } from '@angular/material/dialog';
import { Partido } from 'src/app/models/partido';
import { CreatePartidoComponent } from '../create-partido/create-partido.component';
import { UnirsePartidoComponent } from '../unirse-a-partido/unirse-partido.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CampoService } from 'src/app/services/campo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PartidoService } from 'src/app/services/partido.service';

@Component({
    selector: 'partidos',
    styleUrls: ['partidos.component.css'],
    templateUrl: 'partidos.component.html'
  })

  export class PartidosComponent implements OnInit{

     //Parametros de sesion.
     public identity;
     public token;
     public message;
     public url;

     //Arrays para dias y horas.
     public days = ['Lu','Mar','Mi','Ju','Vi','Sa','Do'];
     public semana = [];
     public hoy = new Date();
     public horas=["09:00 - 10:00","10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00", "14:00 - 15:00",
                   "15:00 - 16:00","17:00 - 18:00","18:00 - 19:00","19:00 - 20:00","21:00 - 22:00","22:00 - 23:00"];

     @ViewChildren("horarios") horarios;


    //Informacion campo partidos.
    public campoId;
    public campo;
    public partidos;
    public size = 0;


    constructor (
      private _userService:UserService,
      private toastr: ToastrService,
      public dialog: MatDialog,

      private route: ActivatedRoute,
      private _campoService: CampoService,
      private _partidoService: PartidoService,
      private renderer: Renderer2,
      private router: Router,
    ){
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }


    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.size=params['size'];
        this.campoId = params['campo_id'];
        //console.log(this.campoId);
        this._campoService.getCampo(this.campoId).subscribe(
          response => {
            this.campo = response.campo;
            //console.log(this.campo);
          },
          (error:HttpErrorResponse)=>{
            this.message = error.error.message;
            this.showToaster();
          }
        );
      });

      this.semana = this.getDias(this.hoy);



    }

    ngAfterViewInit(){

      //Filtramos los partidos anteriores al dia de hoy.
      let horarios_menores = this.horarios.filter(
        div =>  this.toDate( div.nativeElement.id.split("_")[1],div.nativeElement.id.split("_")[2]) < this.hoy
      );

      //Le atribuimos la clase que les corresponde.
        for(let element of horarios_menores){
          this.renderer.addClass(element.nativeElement,'hora_reserva_pasado');
        }

        //Get partidos de la semana
        this._partidoService.getPartidosByFecha(this.semana[0], this.semana[6],this.campoId).subscribe(
          response => {

            this.partidos = response.partidos;

            let horarios_mayores = this.horarios.filter(
              div =>  this.toDate( div.nativeElement.id.split("_")[1],div.nativeElement.id.split("_")[2]) >= this.hoy
            );

            //Colocar partidos privados y publicos.
            for(let ele of horarios_mayores){
              let id = ele.nativeElement.id.split("_"); //horareserva_{{semana[i]}}_{{hora[0]+hora[1]+hora[8]+hora[9]}}"
              let fecha = id[1].split("/") // dd/mm/yyyy

              let tipo;
              let partido_div;


              for(let partido of this.partidos){
                let fecha_inicio_partido = partido.fechaInicio.substring(11,13); //horaInicio
                let fecha_fin_partido = partido.fechaFin.substring(11,13); //horaFin
                let dia_partido = partido.fechaFin.substring(0,10); dia_partido = dia_partido.split("-"); //yyyy-mm-dd

                if(this.esPrivado(fecha,dia_partido,fecha_inicio_partido,fecha_fin_partido,id,partido)){
                  //hay partido privado en esta fecha.
                  tipo = 2;
                }else if(this.esPublico(fecha,dia_partido,fecha_inicio_partido,fecha_fin_partido,id,partido)){
                  //Hay partido publico en esa fecha
                  tipo = 1;
                  partido_div = partido;
                }
              }

              switch (tipo){
                case 2:
                  this.renderer.addClass(ele.nativeElement,'hora_reserva_privado');
                  let p = this.renderer.createElement('p');
                  this.renderer.addClass(p,'parrafo-publico');
                  this.renderer.appendChild(p,this.renderer.createText('Ocupado'));
                  this.renderer.appendChild(ele.nativeElement, p);
                  break;
                case 1:
                  this.renderer.addClass(ele.nativeElement,'hora_reserva_publico');

                  let pa = this.renderer.createElement('p');
                  this.renderer.addClass(pa,'parrafo-publico');
                  this.renderer.appendChild(pa,this.renderer.createText('Unirse a partido público.'));
                  this.renderer.appendChild(ele.nativeElement, pa);

                  const icon = this.renderer.createElement('mat-icon');
                  this.renderer.appendChild(icon, this.renderer.createText('group_add'));
                  this.renderer.addClass(icon, 'mat-icon');
                  this.renderer.addClass(icon, 'material-icons');
                  this.renderer.appendChild(ele.nativeElement, icon);
                  this.renderer.listen(ele.nativeElement, 'click', (evt) => {
                    this.openDialogUnirseAPartido(ele.nativeElement,partido_div)
                  });
                  break;
                default:
                  this.renderer.addClass(ele.nativeElement,'hora_reserva_libre');
                  let par = this.renderer.createElement('p');
                  this.renderer.addClass(par,'parrafo-publico');
                  this.renderer.appendChild(par,this.renderer.createText('Reservar campo.'));
                  this.renderer.appendChild(ele.nativeElement, par);
                  this.renderer.listen(ele.nativeElement, 'click', (evt) => {
                    this.opendialogPartido(ele.nativeElement)
                  });
                  break;
              }
            }
          }
        );
      }


    opendialogPartido(ele): void {
        //CrearPartido
        let fechaInicio = this.toDate( ele.id.split("_")[1],ele.id.split("_")[2]);
        let fechaFin = this.toDate( ele.id.split("_")[1],ele.id.split("_")[2]);
        fechaFin.setHours(fechaInicio.getHours()+1);

        let dia = fechaInicio.toLocaleDateString();

        const dialogRef = this.dialog.open(CreatePartidoComponent, {
          width: '1000px',
          height:'500px',
          data: {campo: this.campo, fechaInicio:fechaInicio, fechaFin: fechaFin, dia: dia },
          autoFocus:true,
        });

        dialogRef.afterClosed().subscribe(
          result => {
            if(result.tipo != 3){
              this._partidoService.create(result).subscribe(
                response => {
                  let partidoCreado = response.partido;
                  console.log(partidoCreado);
                  this.message="Partido creado correctamente";
                  this.showToasterBueno();
                  //router a "Mis Partidos"
                },
                (error:HttpErrorResponse)=>{
                  this.message = error.error.message;
                  this.showToaster();
                }
              );
            }
        });
    }

    openDialogUnirseAPartido(elemento,partido){

       const dialogRef = this.dialog.open(UnirsePartidoComponent, {
         width: '1000px',
         height:'600px',
         data: {partido:partido},
         autoFocus:true,
       });

       dialogRef.afterClosed().subscribe(
        result => {
          if (result != null){
            result.jugadores.push(this.identity);
            this._partidoService.updatePartido(result).subscribe(
              params => {
                partido.jugadores.push(this.identity);
                this.message="Te has unido al partido correctamente."
                this.showToasterBueno();
              },
              (error:HttpErrorResponse)=>{
                this.message = error.error.message;
                this.showToaster();
              }
            )
          }
        },
        (error:HttpErrorResponse)=>{
          this.message = error.error.message;
          this.showToaster();
        }
      );
    }

    //Funciones para parsear dias y fechas.
    getDias(hoy){
      if(this.size==1){
       hoy = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
      }
      let dias = Array(7);
      let number_hoy = hoy.getDay(); //0 domingo, 6 sabado.
      let hoy_date = hoy.getDate();

      switch(number_hoy){
        case 0:
          dias[6] = hoy.toLocaleDateString();
          number_hoy = 6;
          break;
        default:
          number_hoy = number_hoy-1;
          dias[number_hoy] = ('0' + hoy.getDate()).slice(-2) + '/'
                              + ('0' + (hoy.getMonth()+1)).slice(-2) + '/'
                              + hoy.getFullYear();;
      }

      for(var i = number_hoy-1; i>=0;i--){
        let dia2 = new Date();
        dia2.setDate(hoy_date-(number_hoy-i));
        dias[i] = ('0' + dia2.getDate()).slice(-2) + '/'
                    + ('0' + (dia2.getMonth()+1)).slice(-2) + '/'
                    + dia2.getFullYear();
      }

      for(var j = number_hoy+1; j<=6;j++){
        let dia2 = new Date();
        dia2.setDate(hoy_date+(j-number_hoy));
        //dias[j] = dia2.toLocaleDateString();
        dias[j] = ('0' + dia2.getDate()).slice(-2) + '/'
                    + ('0' + (dia2.getMonth()+1)).slice(-2) + '/'
                    + dia2.getFullYear();
      }
      return dias;
    }

    toDate(fecha, hora) {
      var parts = fecha. split("/")
      return new Date(parts[2], parts[1] - 1, parts[0],hora.substring(0,2),0,0);
    }


    //Funciones para comprobar si un partido es publico o privado.
    esPublico(fecha,dia_partido,fecha_inicio_partido,fecha_fin_partido,id,partido){
      return fecha[2] == dia_partido[0] && fecha[0]==dia_partido[2] && fecha[1]==dia_partido[1]
             && fecha_inicio_partido==id[2].substring(0,2) && fecha_fin_partido==id[2].substring(2,4)
             && partido.tipo == 1;
    }
    esPrivado(fecha,dia_partido,fecha_inicio_partido,fecha_fin_partido,id,partido){
      return fecha[2] == dia_partido[0] && fecha[0]==dia_partido[2] && fecha[1]==dia_partido[1]
             && fecha_inicio_partido==id[2].substring(0,2) && fecha_fin_partido==id[2].substring(2,4)
             && partido.tipo == 2
    }

    redirect_atras(){
      this.router.navigate(['complejos/campos'], {queryParams: {complejo_id : this.campo.complejo._id, tipo: this.campo.tipo},skipLocationChange:true});
    }
    redirect_sig_pagina(){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['complejos/campos/partidos'], { queryParams: { campo_id: this.campoId, size:1 },skipLocationChange:true}));
    }
    redirect_ant_pagina(){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['complejos/campos/partidos'], { queryParams: { campo_id: this.campoId, size:0 },skipLocationChange:true}));
    }


    //Funciones para toaster push.
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
