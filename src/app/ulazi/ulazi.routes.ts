import { Routes } from "@angular/router";
import { PrimkeComponent } from "./primke/primke.component";
import { PRIMKE_ROUTES } from "./primke/primke.routes";
import { DobavljaciComponent } from "./dobavljaci/dobavljaci.component";
import { InventuraComponent } from "./inventura/inventura.component";



export const ULAZI_ROUTES: Routes =[
    { path: '', redirectTo: 'primke', pathMatch : 'full'},
    {path: 'primke', component: PrimkeComponent, children: PRIMKE_ROUTES},
    {path: 'dobavljaci', component: DobavljaciComponent},
    {path: 'inventura', component: InventuraComponent},
];