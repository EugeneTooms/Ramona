import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { NavigacijaComponent } from './navigacija/navigacija.component';


import { NavigacijaModule } from './navigacija/navigacija.module';
import { PrimkeModule } from './primke/primke.module';
import { InventuraModule } from './inventura/inventura.module';
import { DobavljacModule } from './dobavljac/dobavljac.module';

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    NavigacijaModule,
    PrimkeModule,
    DobavljacModule,
    InventuraModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
