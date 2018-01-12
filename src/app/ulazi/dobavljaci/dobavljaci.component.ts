import { Component, OnInit, Input } from '@angular/core';
import { Dobavljac } from './dobavljac.model';
import { DobavljaciService } from './dobavljaci.service';

@Component({
  selector: 'app-dobavljaci',
  templateUrl: './dobavljaci.component.html',
  styleUrls: ['./dobavljaci.component.css']
})
export class DobavljaciComponent implements OnInit {
  @Input() dobavljaci : Dobavljac[]

  constructor(private dobavljacService : DobavljaciService) { }

  ngOnInit() {
    this.dobavljacService.getDobavljace()
    .subscribe(
      (dobavljaci = []) => {this.dobavljaci = dobavljaci}
    );
  }

}
