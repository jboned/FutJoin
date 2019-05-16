import {Component, OnInit} from '@angular/core';
import {ComplejoDeportivoService} from '../services/complejo_deportivo.service';


@Component({
    selector: 'complejo-create',
    templateUrl: './create-complejo.component.html',
    //styleUrls: ['./user-edit.component.css'],
    providers:[ComplejoDeportivoService]
})

export class CreateComplejoComponent implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}