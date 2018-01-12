import { Http, Response, Headers} from '@angular/http'
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Article } from './article.model';

@Injectable()
export class InventuraService{
    private artikli : Article[] = [];
    constructor (private http : Http){}

    getArtikle(date: Date){
        return this.http.get(environment.apiURL +'inventura/artikli')
            .map((response : Response) => {
                const artikli = response.json().obj;
                let transformedArtikli: Article[] = [];
                for (let artikal of artikli){
                    transformedArtikli.push(new Article(date,
                        artikal.id, 
                        artikal.name, 
                        artikal.grupa, 
                        artikal.postojece_stanje, 
                        artikal.ulazi, 
                        artikal.izlazi,
                        Math.round( (artikal.postojece_stanje + artikal.ulazi - artikal.izlazi) * 10) / 10,
                        Math.round( (artikal.postojece_stanje + artikal.ulazi - artikal.izlazi) * 10) / 10,
                        0));
                }
                this.artikli = transformedArtikli;
                return transformedArtikli;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
        );
    }
    getGrupeArtikala(){
        return this.http.get( environment.apiURL + 'grupeartikala')
            .map((response : Response) => {
                const grupe = response.json().obj;
                return grupe;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
        );
    }
    dodajInventuru(artikli: Article[]){
        const body = JSON.stringify(artikli);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post(environment.apiURL + 'inventura', body, {headers: headers})
            .map((response : Response) => response.json() )
            .catch((error: Response) => Observable.throw(error.json())
        );
    }
}