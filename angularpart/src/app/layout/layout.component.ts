import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-navbar></app-navbar>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class LayoutComponent { }