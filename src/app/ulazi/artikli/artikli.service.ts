import { Http, Response, Headers} from '@angular/http'
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Artikal } from './artikal.model';


@Injectable()
export class ArtikliService {
  private Artikli : Artikal[];
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
                    artikal.unit));
            }
            this.Artikli = transformedArtikli;
            return transformedArtikli;
        })
        .catch((error: Response) => Observable.throw(error.json()) 
    );
}

}
