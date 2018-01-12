import { Http, Response, Headers} from '@angular/http'
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Primka } from './primka.model';


@Injectable()
export class PrimkeService {
  private Primke : Primka[];
  constructor(private http : Http) { }
  getPrimke(){
    return this.http.get( environment.apiURL + 'primke')
        .map((response : Response) => {
            const primke = response.json().obj;
            let transformedPrimke: Primka[] = [];
            for (let primka of primke){
              transformedPrimke.push(new Primka(primka.id, 
                primka.supplier_id,
                primka.number,
                primka.date,
                primka.document_date));
            }
            this.Primke = transformedPrimke;
            return transformedPrimke;
        })
        .catch((error: Response) => Observable.throw(error.json()) 
    );
}

}
