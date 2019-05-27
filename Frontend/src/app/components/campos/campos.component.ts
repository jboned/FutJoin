
import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Campo} from '../../models/campo'
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ComplejoDeportivo } from 'src/app/models/complejodeportivo';
import { GLOBAL } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { CampoService } from 'src/app/services/campo.service';
import { MatPaginator,MatTableDataSource } from '@angular/material';

@Component({
    selector: 'campos',
    styleUrls: ['campos.component.css'],
    templateUrl: 'campos.component.html',
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
      ]),
    ],
  })

  export class CamposComponent implements OnInit{

    //Parametros de sesion.
    public identity;
    public token;
    public message;
    public url;

    //Parametros para componente
    public campo: Campo;
    public campos: Campo[] = [];

    //Parametros que llegan por URL.
    public idComplejo;
    public tipo;

    //Parametros para la tabla
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource: MatTableDataSource<Campo>;
    columnsToDisplay = ['Nombre', 'Largo', 'Ancho', 'Superficie'];
    expandedElement: Campo | null;

    constructor (
      private _userService:UserService,
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router,
      private _campoService:CampoService

    ){

      this.url = GLOBAL.url;

      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();


    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.idComplejo = params['complejo_id'];
        this.tipo = parseInt(params['tipo'],10);
      });
      this.getCampos().subscribe(_=>{;
        this.dataSource = new MatTableDataSource(this.campos);
        this.dataSource.paginator = this.paginator;
      });

    }

    getCampos(){
      return this._campoService.getCampos(this.tipo,this.idComplejo).map(
        (campos) => {
            this.campos = campos.campos;
        })
       .catch((error) => {
          console.log('error ' + error);
          throw error;
        });
    }

    redirect(campoid){
      this.router.navigate(['../../../createcampo/'+campoid], { relativeTo: this.route });
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


