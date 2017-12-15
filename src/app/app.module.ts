import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { PrimkeComponent } from './primke/primke.component';
import { DobavljacComponent } from './dobavljac/dobavljac.component';
import { DobavljacService } from './dobavljac/dobavljac.service';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { InventuraComponent } from './inventura/inventura.component';
import { InventuraService } from './inventura/inventura.service';


@NgModule({
  declarations: [
    AppComponent,
    PrimkeComponent,
    DobavljacComponent,
    NavigacijaComponent,
    InventuraComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  providers: [DobavljacService,InventuraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
