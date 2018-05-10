import { NgModule } from '@angular/core';
import { SortablejsModule } from 'angular-sortablejs';
import { LokacijeComponent } from './lokacije.component';
import { SharedModule } from '../../shared/shared.module';
import { LokacijaService } from './lokacija.service';
import { ArtikliService } from '../../ulazi/artikli/artikli.service';
import { FormsModule } from '@angular/forms';
import { podlokacijaComponent } from './podlokacija.component';


@NgModule({
  imports: [
    SharedModule, FormsModule, SortablejsModule.forRoot({animation : 150})
  ],
  declarations: [LokacijeComponent,podlokacijaComponent],
  exports : [LokacijeComponent,podlokacijaComponent],
  providers: [LokacijaService, ArtikliService]
})
export class LokacijeModule { }
