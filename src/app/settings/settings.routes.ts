import { Routes } from "@angular/router";

import { SettingsComponent } from "./settings.component";
import { GlobalComponent } from "./global/global.component";
import { LokacijeComponent } from "./lokacije/lokacije.component";

export const SETTINGS_ROUTES: Routes =[
    { path: '', redirectTo: 'globalne', pathMatch : 'full'},
    { path: 'globalne', component: GlobalComponent},
    { path: 'lokacije', component: LokacijeComponent}
];