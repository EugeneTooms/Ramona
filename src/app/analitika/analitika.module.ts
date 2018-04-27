import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { routing } from '../app.routing';

import { AnalitikaComponent } from './analitika.component';
import { StanjeSkladistaModule } from './stanje-skladista/stanje-skladista.module';

@NgModule({
  imports: [
    SharedModule, routing, StanjeSkladistaModule
  ],
  declarations: [AnalitikaComponent],
  exports : [AnalitikaComponent, StanjeSkladistaModule]
})
export class AnalitikaModule { }
