import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ArtikliComponent } from './artikli.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ArtikliComponent],
  exports : [ArtikliComponent] 
})
export class ArtikliModule { }
