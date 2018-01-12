import { Http, Response} from '@angular/http'
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Lokacija } from './lokacija.model';

@Injectable()
export class LokacijaService{
    private lokacije : Lokacija[] = [];
    constructor (private http : Http){}

    getLokacije(){
        return this.http.get( environment.apiURL +'lokacije')
            .map((response : Response) => {
                const lokacije = response.json().obj;
                let transformedLokacije: Lokacija[] = [];
                for (let lokacija of lokacije){
                    transformedLokacije.push(new Lokacija(lokacija.id, lokacija.naziv_lokacije));
                }
                this.lokacije = transformedLokacije;
                return transformedLokacije;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
        );
    }
}