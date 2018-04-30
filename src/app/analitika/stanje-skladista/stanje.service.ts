import { Http, Response, Headers} from '@angular/http'
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Stanje } from './stanje.model';
import { Datum } from './datum.model';

@Injectable()
export class StanjeService {
  private stanje : Stanje[];
  private datumi : Datum[];
  constructor (private http : Http){}

  getGrupeArtikala(){
    return this.http.get( environment.apiURL + 'grupeartikala')
        .map((response : Response) => {
            const grupe = response.json().obj;
            return grupe;
        })
        .catch((error: Response) => Observable.throw(error.json()) 
    );
  }
  getDatume(){
    return this.http.get( environment.apiURL + 'analitika/inventorydates')
        .map((response : Response) => {
          const datumi = response.json().obj;
          let transformedDatumi: Datum[] = [];
          for (let datum of datumi){
            
            transformedDatumi.push(new Datum(datum.inventory_id, datum.snapshot_dttm));
          }
          this.datumi = transformedDatumi;
          return transformedDatumi;
        })
        .catch((error: Response) => Observable.throw(error.json()) 
    );
  }
  getStanje(id1 : number,  datum1: string, id2?: number, datum2? : string){
    return this.http.get( environment.apiURL +'analitika/stanje?id1='+ id1 +'&id2='+ id2 +'&datum1='+ datum1 +'&datum2='+ datum2)
    .map((response : Response) => {
        const stanje = response.json().obj;
        let transformedstanje: Stanje[] = [];
        for (let item of stanje){
          transformedstanje.push(new Stanje(
            item.article_id, 
            item.name, 
            item.grupa, 
            item.prije, 
            item.ulazi,
            item.prodaja,
            item.otpisi,
            item.poslije,
            (Math.round( (item.poslije - (item.prije+item.ulazi+item.prodaja+item.otpisi)) * 10) / 10),
            Math.floor((Math.abs((Math.round( (item.poslije - (item.prije+item.ulazi+item.prodaja+item.otpisi)) * 10) / 10)) / item.poslije) * 100)
            ));
        }
        this.stanje = transformedstanje;
        return transformedstanje;
    })
    .catch((error: Response) => Observable.throw(error.json()) 
);
  }

}
