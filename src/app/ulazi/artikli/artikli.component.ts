import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artikli',
  template:`  <app-lista-artikala></app-lista-artikala>            
              <app-artikal-input></app-artikal-input>
            `,
})
export class ArtikliComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
