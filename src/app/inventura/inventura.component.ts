import { Component, OnInit, Input, Injectable } from '@angular/core';
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

  kreiraj;

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
  KreirajInventuru(): void {
    if (this.kreiraj){
      this.kreiraj = null;
    }else{
      this.kreiraj = 1;
    }
  }

}
