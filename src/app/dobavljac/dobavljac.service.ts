import { Http, Response, Headers} from '@angular/http'
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Dobavljac } from "./dobavljac.model";

@Injectable()
export class DobavljacService{
    private dobavljaci : Dobavljac[] = [];
    constructor (private http : Http){}

    getDobavljace(){
        return this.http.get('http://localhost:2000/html/dobavljaci')
            .map((response : Response) => {
                const dobavljaci = response.json().obj;
                let transformedDobavljaci: Dobavljac[] = [];
                for (let dobavljac of dobavljaci){
                    transformedDobavljaci.push(new Dobavljac(dobavljac.id, dobavljac.name));
                }
                this.dobavljaci = transformedDobavljaci;
                console.log(transformedDobavljaci);
                return transformedDobavljaci;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
        );
    }
}