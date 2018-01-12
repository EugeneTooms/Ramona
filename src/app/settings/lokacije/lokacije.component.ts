import { Component, OnInit, Input } from '@angular/core';
import { LokacijaService } from './lokacija.service';
import { Lokacija } from './lokacija.model';
import { Artikal } from '../../ulazi/artikli/artikal.model';
import { ArtikliService } from '../../ulazi/artikli/artikli.service';

@Component({
  selector: 'app-lokacije',
  templateUrl: './lokacije.component.html',
  styleUrls: ['./lokacije.component.css']
})
export class LokacijeComponent implements OnInit {
  @Input() lokacije : Lokacija[]
  @Input() artikli : Artikal[]
  selectedIndex: number = null;

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
  }
  

}
