import { NgModule } from '@angular/core';

import { LokacijeComponent } from './lokacije.component';
import { SharedModule } from '../../shared/shared.module';
import { LokacijaService } from './lokacija.service';
import { ArtikliService } from '../../ulazi/artikli/artikli.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LokacijeComponent],
  exports : [LokacijeComponent],
  providers: [LokacijaService, ArtikliService]
})
export class LokacijeModule { }
