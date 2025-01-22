import { Component, Input, OnInit } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouteConfig } from 'isakov-shared';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'core';

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

  constructor(private route: ActivatedRoute, private authService: AuthService) {}
  @Input() routes: RouteConfig[] =[];

  ngOnInit(): void {
    // Retrieve the routeConfig from the route's data property
    this.routes = this.route.snapshot.data['routeConfig'] || [];
    this.authService.test().subscribe({
      next: data => {
        console.log('User data successfully loaded and saved to localStorage', data);
      },
      error: err => {
        console.error('Failed to load user data:', err);
      }
    });
  }
}
