import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primke',
  template: `<ul class="nav nav-pills nav-justified">
                <li class="nav-item">
                      <a class="nav-link active" routerLinkActive="active" [routerLink]="['lista']">Lista</a>
                </li>
                <li class="nav-item">
                      <a class="nav-link" routerLinkActive="active" [routerLink]="['new']">Nova Primka</a>
                </li>
            </ul>

              <div class="container-fluid">
              <router-outlet></router-outlet>
              </div>`
})
export class PrimkeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
