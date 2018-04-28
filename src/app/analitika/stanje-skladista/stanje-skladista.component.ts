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
  @Input() datumi : Datum[];
  
  grupe : any;
  odabraniDatum : any;
  toggle : boolean = false;
  constructor(private stanjeService : StanjeService) { }

  ngOnInit() {
    this.stanjeService.getGrupeArtikala()
    .subscribe(
      (grupe = []) => {this.grupe = grupe}
    );
    this.stanjeService.getDatume()
      .subscribe((datumi = [] )=> {this.datumi = datumi});
  }
  Odaberi(broj:number){
    console.log(this.datumi);
    this.toggle = true
    const prvi = this.datumi.find(x => x.inventory_id == this.odabraniDatum);
    const drugi = this.datumi.find(x => x.inventory_id == (this.odabraniDatum - 1));
    //this.datumi.find(x => x.id == (this.odabraniArtikal + 1));
    // console.log(prvi);
    // console.log(drugi);

    this.stanjeService.getStanje(prvi.inventory_id, prvi.snapshot_dttm, drugi.inventory_id,  drugi.snapshot_dttm)
      .subscribe((stanje = []) =>{this.stanje = stanje});
  }

}
