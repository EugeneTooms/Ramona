import { Component, OnInit, Input } from '@angular/core';
import { Dobavljac } from './dobavljac.model';
import { DobavljacService } from './dobavljac.service';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {
  @Input() dobavljaci : Dobavljac[]

  constructor(private dobavljacService : DobavljacService) { }

  ngOnInit() {
    this.dobavljacService.getDobavljace()
    .subscribe(
      (dobavljaci = []) => {this.dobavljaci = dobavljaci}
    );
  }

}
