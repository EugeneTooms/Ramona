import { Routes, RouterModule } from '@angular/router';
import { UlaziComponent } from './ulazi/ulazi.component';
import { ULAZI_ROUTES } from './ulazi/ulazi.routes';
import { SettingsComponent } from './settings/settings.component';
import { SETTINGS_ROUTES } from './settings/settings.routes';
import { AnalitikaComponent } from './analitika/analitika.component';
import { ANALITIKA_ROUTES } from './analitika/analitika.routes';


const ROUTES : Routes =[
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'ulazi', component: UlaziComponent, children: ULAZI_ROUTES},
    {path: 'settings', component: SettingsComponent, children: SETTINGS_ROUTES},
    {path : 'analitika', component : AnalitikaComponent, children : ANALITIKA_ROUTES}
];

export const routing = RouterModule.forRoot(ROUTES)