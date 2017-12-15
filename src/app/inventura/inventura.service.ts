import { Http, Response, Headers} from '@angular/http'
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Article } from './article.model';

@Injectable()
export class InventuraService{
    private artikli : Article[] = [];
    constructor (private http : Http){}

    getArtikle(){
        return this.http.get('http://localhost:2000/html/artikli')
            .map((response : Response) => {
                const artikli = response.json().obj;
                let transformedArtikli: Article[] = [];
                for (let artikal of artikli){
                    transformedArtikli.push(new Article(artikal.id, artikal.name, artikal.naziv));
                }
                this.artikli = transformedArtikli;
                return transformedArtikli;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
        );
    }
    getGrupeArtikala(){
        return this.http.get('http://localhost:2000/html/grupeartikala')
            .map((response : Response) => {
                const grupe = response.json().obj;
                return grupe;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
        );
    }
}