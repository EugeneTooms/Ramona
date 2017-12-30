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
    this.inventuraService.getGrupeArtikala()
    .subscribe(
      (grupe = []) => {this.grupe = grupe}
    );
    this.inventuraService.getArtikle()
    .subscribe(
      (artikli = []) => {this.artikli = artikli}
    );
  }
  KreirajInventuru()  {
    this.DatumInventure = this.myForm.value.datum;
  }

  DodajStanje(artikal : Article){
    artikal.novo_stanje += 1;
  }
  OduzmiStanje(artikal : Article){
    artikal.novo_stanje -= 1;
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
