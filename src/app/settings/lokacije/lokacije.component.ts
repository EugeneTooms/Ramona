import { Component, OnInit, Input } from '@angular/core';

import { LokacijaService } from './lokacija.service';
import { ArtikliService } from '../../ulazi/artikli/artikli.service';

import { Lokacija } from './lokacija.model';
import { Artikal } from '../../ulazi/artikli/artikal.model';
import { Lokacija_Artikal } from './lokacija_artikal.model';



@Component({
  selector: 'app-lokacije',
  templateUrl: './lokacije.component.html',
  styleUrls: ['./lokacije.component.css']
})
export class LokacijeComponent implements OnInit {
  @Input() lokacije : Lokacija[];
  @Input() artikli : Artikal[];
  @Input() artikliLokacija : Lokacija_Artikal[];
  selectedIndex: number = null;
  odabraniArtikal : number;

  constructor(private lokacijaService : LokacijaService, private artiliService: ArtikliService) { }
  setIndex(index: number) {
    if (this.selectedIndex === index){
      this.selectedIndex = null;
    }else{
      this.selectedIndex = index;
    }
  }
  ngOnInit() {
    this.lokacijaService.getLokacije()
    .subscribe(
      (lokacije = []) => {this.lokacije = lokacije}
    );
    this.artiliService.getArtikle().subscribe((artikli = []) => {this.artikli = artikli});
    this.lokacijaService.getLocationArticles().subscribe((Lokacija_Artikal = []) => {this.artikliLokacija = Lokacija_Artikal});
  }
  dodajArtikal(lokid){
    const noviartikal = new Lokacija_Artikal(this.odabraniArtikal,lokid, this.artikliLokacija.length)
    this.lokacijaService.DodajArtikalNaLokaciju(noviartikal);
  }
  onMove(artikal : Lokacija_Artikal, broj : number){
    console.log("success!");
    console.log(artikal);
    artikal.index = broj;
    console.log(artikal);
  }

}
