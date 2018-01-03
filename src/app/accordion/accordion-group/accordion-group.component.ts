import { Component, OnDestroy, Input, OnChanges, SimpleChange } from '@angular/core';
import { AccordionComponent } from '../accordion.component';

@Component({
  selector: 'accordion-group',
  styleUrls: ['./accordion-group.component.scss'],
  template: `
    <div class="accordion-group" [ngClass]="{'closed': !isOpen}">
      <div class="col-12 btn btn-light panel-heading" (click)="toggleOpen()">
        <span>{{heading}}</span>
      </div>
      <div class="panel-collapse">
        <div class="panel-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})

export class AccordionGroupComponent {
  @Input() heading: string;
  @Input() isOpen: boolean;
  @Input() index: number;

  constructor(private accordion: AccordionComponent) {
    this.accordion.addGroup(this);
  }





  toggleOpen(): void {
    if (!this.isOpen) {
      this.isOpen = true;
      //this.accordion.closeOthers(this);
    }else{
      this.isOpen = false;
    }
  }
}