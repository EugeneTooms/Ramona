import { Http, Response, Headers} from '@angular/http'
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Lokacija } from './lokacija.model';
import { Lokacija_Artikal } from './lokacija_artikal.model';

@Injectable()
export class LokacijaService{
    private lokacije : Lokacija[] = [];
    private lokacijaArtikli : Lokacija_Artikal[] = [];
    constructor (private http : Http){}

    getLokacije(){
        return this.http.get( environment.apiURL +'lokacije')
            .map((response : Response) => {
                const lokacije = response.json().obj;
                let transformedLokacije: Lokacija[] = [];
                for (let lokacija of lokacije){
                    transformedLokacije.push(new Lokacija(lokacija.id, lokacija.naziv_lokacije, lokacija.pozicija));
                }
                this.lokacije = transformedLokacije;
                return transformedLokacije;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
        );
    }
    AddLokacija(lok : Lokacija){
        this.lokacije.push(lok);
        const body = JSON.stringify(lok);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post(environment.apiURL +'lokacije', body , {headers : headers})
            .map((response : Response) => response.json())
            .catch((error : Response) => Observable.throw(error.json()));
    }
    // getLocationArticles(){
    //     return this.http.get( environment.apiURL +'artikli/byLocation')
    //     .map((response : Response) => {
    //         const artikli = response.json().obj;
    //         let transformedartikli: Lokacija_Artikal[] = [];
    //         for (let artikal of artikli){
    //             transformedartikli.push(new Lokacija_Artikal(artikal.article_id , artikal.location_id, artikal.index));
    //         }
    //         this.lokacijaArtikli = transformedartikli;
    //         return transformedartikli;
    //     })
    //     .catch((error: Response) => Observable.throw(error.json()) 
    // );
    // }
    getArticlesByLocation(id: number){
        return this.http.get( environment.apiURL +'artikli/byLocation/'+ id)
        .map((response : Response) => {
            const artikli = response.json().obj;
            let transformedartikli: Lokacija_Artikal[] = [];
            for (let artikal of artikli){
                transformedartikli.push(new Lokacija_Artikal(artikal.article_id , artikal.location_id, artikal.name, artikal.img, artikal.indeks));
            }
            this.lokacijaArtikli = transformedartikli;
            return transformedartikli;
        })
        .catch((error: Response) => Observable.throw(error.json()) 
    );
    }
    DodajArtikalNaLokaciju(artikal : Lokacija_Artikal){
        this.lokacijaArtikli.push(artikal);
        console.log(artikal);
    }
    UpdateLokaciju(){
        const body = JSON.stringify(this.lokacijaArtikli);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post(environment.apiURL +'artikli/byLocation/', body , {headers : headers})
            .map((response : Response) => response.json())
            .catch((error : Response) => Observable.throw(error.json()));
    }
}