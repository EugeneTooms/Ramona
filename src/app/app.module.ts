import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { PrimkeComponent } from './primke/primke.component';
import { DobavljacComponent } from './dobavljac/dobavljac.component';
import { DobavljacService } from './dobavljac/dobavljac.service';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { InventuraComponent } from './inventura/inventura.component';
import { InventuraService } from './inventura/inventura.service';
import { AccordionModule } from './inventura/accordion/accordion.module';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    PrimkeComponent,
    DobavljacComponent,
    NavigacijaComponent,
    InventuraComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule
  ],
  providers: [DobavljacService,InventuraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
