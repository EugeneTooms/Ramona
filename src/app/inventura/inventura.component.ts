import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Article } from './article.model';
import { InventuraService } from './inventura.service';

@Component({
  selector: 'app-inventura',
  templateUrl: './inventura.component.html',
  styleUrls: ['./inventura.component.css']
})
@Injectable()
export class InventuraComponent implements OnInit {
  @Input() artikli : Article[];
  @Input() grupe = [] ;
  @Input() isOpen: boolean;

  DatumInventure;

  constructor(private inventuraService: InventuraService) { }
 
  ngOnInit() {
    this.inventuraService.getGrupeArtikala()
    .subscribe(
      (grupe = []) => {this.grupe = grupe}
    );
    this.inventuraService.getArtikle()
    .subscribe(
      (artikli = []) => {this.artikli = artikli}
    );
  }
  KreirajInventuru(datumForma: NgForm)  {
    this.DatumInventure = datumForma.value.Datum;
  }
  Otkazi(datumForma: NgForm){
    datumForma.reset();
    this.DatumInventure = null;
  }
  DodajStanje(artikal : Article){
    artikal.novo_stanje += 1;
  }
  OduzmiStanje(artikal : Article){
    artikal.novo_stanje -= 1;
  }
  Send(datumForma: NgForm){
    //console.log(datumForma);
    //console.log(this.artikli);
    this.inventuraService.dodajInventuru(this.DatumInventure, this.artikli)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
    datumForma.reset();
    this.DatumInventure = null;
  }

}
