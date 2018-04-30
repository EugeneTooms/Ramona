import { Component, OnInit, Input } from '@angular/core';
import { StanjeService } from './stanje.service';
import { Stanje } from './stanje.model';
import { Datum } from './datum.model';


@Component({
  selector: 'app-stanje-skladista',
  templateUrl: './stanje-skladista.component.html',
  styleUrls: ['./stanje-skladista.component.css']
})
export class StanjeSkladistaComponent implements OnInit {
  @Input() stanje : Stanje[];
  @Input() stanjeraprikaz : Stanje[];
  @Input() datumi : Datum[];
  
  grupe : any;
  odabraniDatum : any;
  toggle : boolean = false;
  postotak : boolean = false;
  constructor(private stanjeService : StanjeService) { }

  ngOnInit() {
    this.stanjeService.getGrupeArtikala()
    .subscribe(
      (grupe = []) => {this.grupe = grupe}
    );
    this.stanjeService.getDatume()
      .subscribe((datumi = [] )=> {this.datumi = datumi});
  }
  SamoRazlika(){
    this.stanjeraprikaz = this.stanje.filter(x => x.razlika != 0);
  }
  Svi(){
    this.stanjeraprikaz = this.stanje;
  }
  Postotak(){
    if (!this.postotak){
      this.postotak = true;
    }else{
      this.postotak = false;
    }

  }
  Odaberi(broj:number){
    let prvi : Datum;
    let drugi : Datum;
    this.toggle = true
    for (let i = this.datumi.length -1; i >= 0 ; i--) {
      if(this.datumi[i].inventory_id == this.odabraniDatum){
        prvi = this.datumi[i];
        drugi = this.datumi[i-1];
        break;
      }    
    }
    console.log(prvi);
    console.log(drugi);
    // console.log((this.datumi.find(x => x.inventory_id == this.odabraniDatum)))
    //const prvi = this.datumi.find(x => x.inventory_id == this.odabraniDatum);
    //const drugi = this.datumi.find(x => x.inventory_id == (this.odabraniDatum - 1));
    //this.datumi.find(x => x.id == (this.odabraniArtikal + 1));
    //  console.log(prvi);
    //  console.log(drugi);

    this.stanjeService.getStanje(prvi.inventory_id, prvi.snapshot_dttm, drugi.inventory_id,  drugi.snapshot_dttm)
      .subscribe((stanje = []) =>{
        this.stanjeraprikaz = stanje
        this.stanje = stanje
      });
  }

}
