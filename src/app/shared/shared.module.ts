import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
 
import { FilterPipe }         from './filter.pipe';
import { AccordionModule } from './accordion/accordion.module';

 
@NgModule({
  imports:      [ CommonModule, AccordionModule ],
  declarations: [ FilterPipe ],
  exports:      [ CommonModule, FilterPipe, AccordionModule ]
})
export class SharedModule { }