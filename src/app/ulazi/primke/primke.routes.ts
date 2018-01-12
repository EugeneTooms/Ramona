import { Routes } from "@angular/router";
import { ListaPrimkiComponent } from "./lista-primki/lista-primki.component";
import { NovaPrimkaComponent } from "./nova-primka/nova-primka.component";

export const PRIMKE_ROUTES: Routes =[
    { path: '', redirectTo: 'lista', pathMatch : 'full'},
    { path: 'lista', component: ListaPrimkiComponent},
    { path: 'new', component: NovaPrimkaComponent}
];