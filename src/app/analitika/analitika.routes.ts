import { Routes } from "@angular/router";
import { StanjeSkladistaComponent } from "./stanje-skladista/stanje-skladista.component";

export const ANALITIKA_ROUTES: Routes =[
    { path: '', redirectTo: 'stanje', pathMatch : 'full'},
    {path: 'stanje', component: StanjeSkladistaComponent}
];