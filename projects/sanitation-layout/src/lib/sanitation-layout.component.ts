import { Component } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@Component({
  selector: 'lib-sanitation-layout',
  standalone: true,
  imports: [SideNavComponent],
  template: `
    <app-side-nav></app-side-nav>
  `,
  styles: ``
})
export class SanitationLayoutComponent {

}
