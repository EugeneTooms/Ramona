import { NgModule } from '@angular/core';
import { routing } from '../app.routing';

import { SharedModule } from '../shared/shared.module';
import { UlaziComponent } from './ulazi.component';
import { PrimkeModule } from './primke/primke.module';
import { DobavljaciModule } from './dobavljaci/dobavljaci.module';
import { InventuraModule } from './inventura/inventura.module';


@NgModule({
  imports: [
    SharedModule,routing,PrimkeModule,DobavljaciModule, InventuraModule
  ],
  declarations: [UlaziComponent],
  exports: [UlaziComponent, PrimkeModule, DobavljaciModule, InventuraModule]
})
export class UlaziModule { }
