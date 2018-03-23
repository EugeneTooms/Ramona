import { Component, OnInit, Input } from '@angular/core';
import { Artikal } from '../artikal.model';
import { ArtikliService } from '../artikli.service';

@Component({
  selector: 'app-lista-artikala',
  templateUrl: './lista-artikala.component.html',
  styleUrls: ['./lista-artikala.component.css']
})
export class ListaArtikalaComponent implements OnInit {
  @Input() artikli : Artikal[] = [];
  artikal : Artikal;
  toggle : number = 0;
  constructor(private artikliService : ArtikliService) { }

  ngOnInit() {
    this.artikliService.getToggle.subscribe(toggle => this.toggle = toggle);
    this.artikliService.getArtikle()
      .subscribe((artikli = []) => {this.artikli = artikli});
  }
  onEdit(art){
    this.artikliService.editArtikal(art);
    this.artikliService.Toggle(1);
  }
  Addnew(){
    this.artikliService.Toggle(1);
  }

}
