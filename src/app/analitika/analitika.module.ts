import { NgModule } from '@angular/core';

import { AnalitikaComponent } from './analitika.component';
import { SharedModule } from '../shared/shared.module';
import { StanjeSkladistaComponent } from './stanje-skladista/stanje-skladista.component';
import { routing } from '../app.routing';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [AnalitikaComponent, StanjeSkladistaComponent],
  exports : [AnalitikaComponent, StanjeSkladistaComponent]
})
export class AnalitikaModule { }
