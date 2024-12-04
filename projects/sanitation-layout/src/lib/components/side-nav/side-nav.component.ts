import { Component, inject, Input, OnInit  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { RouteConfig } from 'isakov-shared';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SideNavRightComponent } from '../side-nav-right/side-nav-right.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    SideNavRightComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {

  isReportsRoute(): boolean {
    return this.router.url.includes('reports');
  }

  isAddUserRoute(): boolean {
    return this.router.url.includes('add-user');
  }

  isExcludedRoute(): boolean {
    const excludedRoutes = ['reports', 'aggiungi-dispositivo', 'add-user']; // Add more routes as needed
    return excludedRoutes.some(route => this.router.url.includes(route));
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    
    constructor(private router: Router, private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIconSet(
        sanitizer.bypassSecurityTrustResourceUrl('/assets/material-icons.svg')
      );
    }

    @Input() routes: RouteConfig[] = []
    label: string = ''
    
    capitalizeWords(str: string): string {
      return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    }
    formattedRouteName: string = '';
    buttonName: string = ''
  ngOnInit() {
    // Get the current route path
    this.router.events.subscribe(() => {
      const routePath = this.router.url; // Get last segment of the route

      if (routePath.includes('add-user')) {
        this.buttonName = 'Crea Utente';
      } else {
        this.buttonName = 'Nuova Dispositvo'; // Set a default button name for other routes
      }
      
      console.log(routePath, 'rotue pateh')
      const matchedRoute = this.routes.find(route => route.path === routePath);
      this.label = matchedRoute ? this.capitalizeWords(matchedRoute.label) : 'Default Label';
      this.formattedRouteName = routePath; // Default to 'Dashboard' if undefined
    });
  }

  // Helper method to capitalize the first letter of the string
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
