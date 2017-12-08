import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimkeComponent } from './primke/primke.component';
import { DobavljacComponent } from './dobavljac/dobavljac.component';
import { DobavljacService } from './dobavljac/dobavljac.service';

@NgModule({
  declarations: [
    AppComponent,
    PrimkeComponent,
    DobavljacComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DobavljacService],
  bootstrap: [AppComponent]
})
export class AppModule { }
