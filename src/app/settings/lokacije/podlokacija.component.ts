import { Component, OnInit, Input } from '@angular/core';

import { LokacijaService } from './lokacija.service';
import { ArtikliService } from '../../ulazi/artikli/artikli.service';

import { Lokacija } from './lokacija.model';
import { Artikal } from '../../ulazi/artikli/artikal.model';
import { Lokacija_Artikal } from './lokacija_artikal.model';
import { NgForm } from '@angular/forms';
import { SortablejsOptions } from 'angular-sortablejs/dist';



@Component({
  selector: 'app-podlokacija',
  templateUrl: './podlokacija.component.html',
  styles: []
})
export class podlokacijaComponent implements OnInit {


  constructor(private lokacijaService : LokacijaService, private artiliService: ArtikliService) {  }
 
  ngOnInit() {
  }

}
