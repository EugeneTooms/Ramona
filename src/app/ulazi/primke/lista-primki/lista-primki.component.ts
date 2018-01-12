import { Component, OnInit, Input } from '@angular/core';
import { Primka } from '../primka.model';
import { PrimkeService } from '../primke.service';
import { DobavljaciService } from '../../dobavljaci/dobavljaci.service';
import { Dobavljac } from '../../dobavljaci/dobavljac.model';

@Component({
  selector: 'app-lista-primki',
  templateUrl: './lista-primki.component.html',
  styleUrls: ['./lista-primki.component.css']
})
export class ListaPrimkiComponent implements OnInit {
  @Input() primke : Primka[];
  @Input() dobavljaci : Dobavljac[];

  constructor(private primkeService: PrimkeService, private dobavljacService: DobavljaciService) { }

  ngOnInit() {
    this.primkeService.getPrimke()
    .subscribe(
      (primke = []) => {this.primke = primke}
    );
    this.dobavljacService.getDobavljace()
    .subscribe(
      (dobavljaci = []) => {this.dobavljaci = dobavljaci}
    );
  }

}
