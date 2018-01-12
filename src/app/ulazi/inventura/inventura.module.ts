import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InventuraService } from './inventura.service';
import { InventuraComponent } from './inventura.component';


@NgModule({
  imports: [ SharedModule, ReactiveFormsModule,  FormsModule],
  declarations: [
    InventuraComponent
  ],
  exports: [
    InventuraComponent,
  ],
  providers :[InventuraService] 
})
export class InventuraModule {}