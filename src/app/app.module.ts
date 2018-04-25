import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { NavigacijaModule } from './navigacija/navigacija.module';

import { UlaziModule } from './ulazi/ulazi.module';


import { SettingsModule } from './settings/settings.module';
import { AnalitikaModule } from './analitika/analitika.module';



@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    NavigacijaModule,
    UlaziModule,
    SettingsModule,
    AnalitikaModule,
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
