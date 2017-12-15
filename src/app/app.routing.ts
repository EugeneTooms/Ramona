import { Routes, RouterModule } from '@angular/router';
import { InventuraComponent } from './inventura/inventura.component';
import { DobavljacComponent } from './dobavljac/dobavljac.component';

const ROUTES : Routes =[
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'inventura', component: InventuraComponent},
    {path: 'dobavljaci', component: DobavljacComponent}
];

export const routing = RouterModule.forRoot(ROUTES)