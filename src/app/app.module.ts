import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimkeComponent } from './primke/primke.component';
import { DobavljacComponent } from './dobavljac/dobavljac.component';
import { DobavljacService } from './dobavljac/dobavljac.service';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { InventuraComponent } from './inventura/inventura.component';
import { routing } from './app.routing';

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
    routing
  ],
  providers: [DobavljacService],
  bootstrap: [AppComponent]
})
export class AppModule { }
