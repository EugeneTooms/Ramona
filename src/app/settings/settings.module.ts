import { NgModule } from '@angular/core';
import { routing } from '../app.routing';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { GlobalComponent } from './global/global.component';
import { LokacijeModule } from './lokacije/lokacija.module';
import { SlikeModule } from './slike/slike.module';

@NgModule({
  imports: [
    SharedModule, routing, LokacijeModule, SlikeModule
  ],
  declarations: [SettingsComponent, GlobalComponent],
  exports : [SettingsComponent, GlobalComponent, LokacijeModule, SlikeModule],
  providers: []
})
export class SettingsModule { }
