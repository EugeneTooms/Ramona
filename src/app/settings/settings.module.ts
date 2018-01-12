import { NgModule } from '@angular/core';
import { routing } from '../app.routing';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { GlobalComponent } from './global/global.component';
import { LokacijeModule } from './lokacije/lokacija.module';

@NgModule({
  imports: [
    SharedModule, routing, LokacijeModule
  ],
  declarations: [SettingsComponent, GlobalComponent],
  exports : [SettingsComponent, GlobalComponent, LokacijeModule],
  providers: []
})
export class SettingsModule { }
