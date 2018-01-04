import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DobavljacComponent } from './dobavljac.component';
import { DobavljacService } from './dobavljac.service';


@NgModule({
  imports: [ SharedModule ],
  declarations: [
    DobavljacComponent
  ],
  exports: [
    DobavljacComponent,
  ],
  providers :[DobavljacService] 
})
export class DobavljacModule {}