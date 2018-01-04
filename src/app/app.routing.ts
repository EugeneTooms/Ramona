import { Routes, RouterModule } from '@angular/router';
import { InventuraComponent } from './inventura/inventura.component';
import { DobavljacComponent } from './dobavljac/dobavljac.component';
import { PrimkeComponent } from './primke/primke.component';
import { PRIMKE_ROUTES } from './primke/primke.routes';

const ROUTES : Routes =[
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'inventura', component: InventuraComponent},
    {path: 'dobavljaci', component: DobavljacComponent},
    {path: 'primke', component: PrimkeComponent, children: PRIMKE_ROUTES}
];

export const routing = RouterModule.forRoot(ROUTES)