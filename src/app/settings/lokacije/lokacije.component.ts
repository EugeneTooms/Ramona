import { Component, OnInit, Input } from '@angular/core';

import { LokacijaService } from './lokacija.service';
import { ArtikliService } from '../../ulazi/artikli/artikli.service';

import { Lokacija } from './lokacija.model';
import { Artikal } from '../../ulazi/artikli/artikal.model';
import { Lokacija_Artikal } from './lokacija_artikal.model';
import { NgForm } from '@angular/forms';
import { SortablejsOptions } from 'angular-sortablejs/dist';



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

  constructor(private lokacijaService : LokacijaService, private artiliService: ArtikliService) {  }
 
   eventOptions: SortablejsOptions = {
    onUpdate :(event: any) => {
      this.artikliLokacija.forEach((art: Lokacija_Artikal ,index)=>{
        art.index = index + 1;
      });
    }
  };

  setIndex(index: number, id : number) {
    if (this.selectedIndex === index){
      this.selectedIndex = null;
    }else{
      this.selectedIndex = index;
      this.lokacijaService.getArticlesByLocation(id).subscribe((Lokacija_Artikal = []) => {this.artikliLokacija = Lokacija_Artikal});
    }
  }
  ngOnInit() {
    this.lokacijaService.getLokacije()
    .subscribe(
      (lokacije = []) => {this.lokacije = lokacije}
    );
    this.artiliService.getArtikle().subscribe((artikli = []) => {this.artikli = artikli});
  }
  dodajArtikal(lokid){
    const noviartikal = new Lokacija_Artikal(this.odabraniArtikal,lokid, this.artikliLokacija.length)
    this.lokacijaService.DodajArtikalNaLokaciju(noviartikal);
  }
  dodajLokaciju(form : NgForm){
    let novalokacija = new Lokacija(this.lokacije.length + 1 , form.value.novaLokacija);
    this.lokacijaService.AddLokacija(novalokacija)
      .subscribe(data => console.log(data), error => console.log(error)
    );
    form.resetForm();
  }
  SpremiLokaciju(form : NgForm, id : number){
    this.lokacijaService.UpdateLokaciju()
      .subscribe(data => console.log(data), error => console.log(error));
  }
}
