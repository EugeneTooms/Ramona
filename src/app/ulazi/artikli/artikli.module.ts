import { NgModule } from '@angular/core';

import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { ArtikliComponent } from './artikli.component';
import { ListaArtikalaComponent } from './lista-artikala/lista-artikala.component';
import { ArtikalInputComponent } from './artikal-input/artikal-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    SharedModule, FormsModule, FileUploadModule
  ],
  declarations: [ArtikliComponent, ListaArtikalaComponent, ArtikalInputComponent],
  exports : [ArtikliComponent, ListaArtikalaComponent, ArtikalInputComponent] 
})
export class ArtikliModule { }
