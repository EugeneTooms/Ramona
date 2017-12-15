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
  @Input() articles : Article[];
  @Input() grupe = [] ;
  constructor(private inventuraService: InventuraService) { }

  ngOnInit() {
    this.inventuraService.getGrupeArtikala()
    .subscribe(
      (grupe = []) => {this.grupe = grupe}
    );
  }

}
