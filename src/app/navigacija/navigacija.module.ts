import { NgModule } from '@angular/core';
import { routing } from '../app.routing';
import { AccordionModule } from '../shared/accordion/accordion.module';

import { NavigacijaComponent } from './navigacija.component';


@NgModule({
  imports: [ routing, AccordionModule],
  declarations: [
    NavigacijaComponent
  ],
  exports: [
    NavigacijaComponent,
  ]
})
export class NavigacijaModule {}