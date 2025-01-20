import { Component, Input, OnInit } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouteConfig } from 'isakov-shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-sanitation-layout',
  standalone: true,
  imports: [SideNavComponent],
  template: `
    <app-side-nav [routes]="routes"><ng-content></ng-content></app-side-nav>
  `,
  styles: ``
})
export class SanitationLayoutComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  @Input() routes: RouteConfig[] =[];

  ngOnInit(): void {
    // Retrieve the routeConfig from the route's data property
    this.routes = this.route.snapshot.data['routeConfig'] || [];
  }
}
