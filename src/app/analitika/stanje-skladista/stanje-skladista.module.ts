import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StanjeSkladistaComponent } from './stanje-skladista.component';
import { StanjeService } from './stanje.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    SharedModule, FormsModule
  ],
  declarations: [StanjeSkladistaComponent],
  exports : [StanjeSkladistaComponent],
  providers : [StanjeService]
})
export class StanjeSkladistaModule { }
