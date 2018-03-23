import { Http, Response, Headers} from '@angular/http'
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Artikal } from './artikal.model';
import { Router } from '@angular/router';


@Injectable()
export class ArtikliService {
    private Artikli : Artikal[];

    artikalIsEdit : EventEmitter<Artikal> = new EventEmitter<Artikal>();
    private toggle = new BehaviorSubject<number>(0);
    getToggle = this.toggle.asObservable();

    constructor(private http : Http) { }
    getArtikle(){
        return this.http.get( environment.apiURL + 'artikli')
            .map((response : Response) => {
                const artikli = response.json().obj;
                let transformedArtikli: Artikal[] = [];
                for (let artikal of artikli){
                    transformedArtikli.push(new Artikal(artikal.id, 
                        artikal.barcode,
                        artikal.name,
                        artikal.tax_group_id,
                        artikal.prikaz_group_id,
                        artikal.unit,
                        artikal.price_sell,
                        artikal.price_buy,
                        artikal.feedback_compensation,
                        artikal.dozvoljeni_kalo,
                        artikal.img
                    ));
                }
                this.Artikli = transformedArtikli;
                return transformedArtikli;
            })
            .catch((error: Response) => Observable.throw(error.json()) 
            );
    }
    updateArtikal(artikal : Artikal){
        const body = JSON.stringify(artikal);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.patch(environment.apiURL + 'artikli/' + artikal.id, body, {headers:headers})
            .map((response : Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    editArtikal(artikal : Artikal){
        this.artikalIsEdit.emit(artikal);
    }
    Toggle(tog : number){
        this.toggle.next(tog);
    }

}
