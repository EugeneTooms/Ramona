import { Component, OnInit } from '@angular/core';
import { Artikal } from '../artikal.model';
import { ArtikliService } from '../artikli.service';
import { NgForm } from "@angular/forms";
import { FileUploader } from 'ng2-file-upload'

const URL = 'http://localhost:2000/ang/slike';

@Component({
  selector: 'app-artikal-input',
  templateUrl: './artikal-input.component.html',
  styleUrls: ['./artikal-input.component.css']
})
export class ArtikalInputComponent implements OnInit {
  artikal : Artikal;
  
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  toggle : number;

  constructor(private artikliService : ArtikliService) { }

  ngOnInit() {
    this.artikliService.getToggle.subscribe(toggle => this.toggle = toggle);
    this.GetArtikal();
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      // console.log("ImageUpload:uploaded:", item, status, response);
      // console.log(item.file.name);
      this.artikal.img = item.file.name;
    };
  }
  GetArtikal(){
    this.artikliService.artikalIsEdit.subscribe(
      (artikal : Artikal) => {this.artikal = artikal;}
    ); 
  }
  SpremiArtikal(form : NgForm){
    if (this.artikal){
      // uredi artikal
      this.artikal.barcode = form.value.barcode;
      this.artikal.naziv = form.value.naziv;
      this.artikal.poreznaGrupa = form.value.poreznaGrupa;
      this.artikal.grupaPrikaza = form.value.grupaPrikaza;
      this.artikal.jedinica = form.value.Jedinica;
      this.artikal.prodajnaCijena = form.value.PC;
      this.artikal.nabavnaCijena = form.value.NC;
      this.artikal.naknada = form.value.Povrat;
      this.artikal.kalo = form.value.Kalo;

      
      this.artikliService.updateArtikal(this.artikal)
        .subscribe(result => console.log(result));
    }else{
      //kreiraj novi artikal
      this.artikal.barcode = form.value.barcode;
      this.artikal.naziv = form.value.naziv;
      this.artikal.poreznaGrupa = form.value.poreznaGrupa;
      this.artikal.grupaPrikaza = form.value.grupaPrikaza;
      this.artikal.jedinica = form.value.Jedinica;
      this.artikal.prodajnaCijena = form.value.PC;
      this.artikal.nabavnaCijena = form.value.NC;
      this.artikal.naknada = form.value.Povrat;
      this.artikal.kalo = form.value.Kalo;
    }
    this.artikal = null;
    form.resetForm();
    this.artikliService.Toggle(0);
  }
  Dismiss(form : NgForm){
    this.artikal = null;
    form.resetForm();
    this.artikliService.Toggle(0);
  }
}
