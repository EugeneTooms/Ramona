import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DobavljaciComponent } from './dobavljaci.component';
import { DobavljaciService } from './dobavljaci.service';


@NgModule({
  imports: [ SharedModule ],
  declarations: [
    DobavljaciComponent
  ],
  exports: [
    DobavljaciComponent,
  ],
  providers :[DobavljaciService] 
})
export class DobavljaciModule {}