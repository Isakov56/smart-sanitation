import { Component, Input } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouteConfig } from 'isakov-shared';

@Component({
  selector: 'lib-sanitation-layout',
  standalone: true,
  imports: [SideNavComponent],
  template: `
    <app-side-nav [routes]="routes"><ng-content></ng-content></app-side-nav>
  `,
  styles: ``
})
export class SanitationLayoutComponent {
  @Input() routes: RouteConfig[] =[];
}
