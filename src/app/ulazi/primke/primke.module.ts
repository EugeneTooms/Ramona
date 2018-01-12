import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { routing } from '../../app.routing';

import { PrimkeComponent } from './primke.component';
import { ListaPrimkiComponent } from './lista-primki/lista-primki.component';
import { NovaPrimkaComponent } from './nova-primka/nova-primka.component';
import { PrimkeService } from './primke.service';





@NgModule({
  imports: [ SharedModule,routing ],
  declarations: [
    PrimkeComponent,
    ListaPrimkiComponent,
    NovaPrimkaComponent
  ],
  exports: [
    PrimkeComponent,
    ListaPrimkiComponent,
    NovaPrimkaComponent
  ],
  providers :[PrimkeService] 
})
export class PrimkeModule {}