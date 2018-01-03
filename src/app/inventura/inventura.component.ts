import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { Article } from './article.model';
import { InventuraService } from './inventura.service';

@Component({
  selector: 'app-inventura',
  templateUrl: './inventura.component.html',
  styleUrls: ['./inventura.component.css']
})
@Injectable()
export class InventuraComponent implements OnInit {
  myForm: FormGroup;
  @Input() artikli : Article[];
  @Input() grupe = [] ;
  @Input() isOpen: boolean;

  DatumInventure;

  constructor(private inventuraService: InventuraService) { }
 
  ngOnInit() {
    this.myForm = new FormGroup({
      datum: new FormControl(null, Validators.required)
    });
    // this.inventuraService.getGrupeArtikala()
    // .subscribe(
    //   (grupe = []) => {this.grupe = grupe}
    // );
    // this.inventuraService.getArtikle()
    // .subscribe(
    //   (artikli = []) => {this.artikli = artikli}
    // );
  }
  KreirajInventuru()  {
    this.DatumInventure = this.myForm.value.datum;

    this.inventuraService.getGrupeArtikala()
    .subscribe(
      (grupe = []) => {this.grupe = grupe}
    );
    this.inventuraService.getArtikle(this.DatumInventure)
    .subscribe(
      (artikli = []) => {this.artikli = artikli}
    );
  }

  DodajStanje(artikal : Article){
    artikal.stanje += 1;
    artikal.razlika = artikal.novo_stanje - artikal.stanje;
  }
  OduzmiStanje(artikal : Article){
    artikal.stanje -= 1;
    artikal.razlika = artikal.novo_stanje - artikal.stanje;
  }
  onChange(artikal : Article, broj : number){
    artikal.stanje = broj;
    artikal.razlika = artikal.novo_stanje - artikal.stanje;
  }
  Otkazi(){
    this.myForm.reset();
    this.DatumInventure = null;
  }
  Send(){
    this.inventuraService.dodajInventuru(this.DatumInventure, this.artikli)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
    this.myForm.reset();
    this.DatumInventure = null;
  }

}
