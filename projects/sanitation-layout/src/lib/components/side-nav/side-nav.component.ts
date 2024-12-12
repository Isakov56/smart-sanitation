import { Component, inject, Input, OnInit, TemplateRef, ChangeDetectorRef  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { RouteConfig } from 'isakov-shared';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SideNavRightComponent } from '../side-nav-right/side-nav-right.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from 'core';
import {  FormGroup, Validators } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


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
    SideNavRightComponent,
    NgbModalModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions = this.options;

  deviceForm = new FormGroup({
    title: new FormControl('', Validators.required),
    id: new FormControl(5, Validators.required),  // Default value for 'type'
    chartType: new FormControl('pie', Validators.required),
    cols: new FormControl(4, Validators.required),
    rows: new FormControl(4, Validators.required),
  });

  private devicesSubscription!: Subscription;

  modalRef: any;

  addDevice(): void {
    if (this.deviceForm.valid) {
      const currentDevices = this.appStateService.getDevices();
      // Dynamically set the id to be the number of current devices + 1
      const newDevice = { ...this.deviceForm.value, id: currentDevices.length + 1 };
  
      // Add the new device to the list of devices
      this.appStateService.setDevices([...currentDevices, newDevice]);
  
      this.closeModal();
      // Trigger change detection to ensure the UI updates
      this.cdr.detectChanges();
      this.deviceForm.reset({
        title: '', // Optional: provide default values
        id: currentDevices.length + 2, // Or simply reset to the next id (optional)
        chartType: 'pie',
        cols: 4,
        rows: 4
      });
    }
  }

  // close(): void {
  //   this.activeModal.dismiss();
  // }

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


  constructor(private router: Router, private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private modalService: NgbModal, private appStateService: AppStateService, private cdr: ChangeDetectorRef) {
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('/assets/material-icons.svg')
    );
  }

  openModal(modalTemplate: TemplateRef<any>) {
    // Store the reference of the opened modal
    this.modalRef = this.modalService.open(modalTemplate, { centered: true });
  }

  // Method to close the modal
  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();  // Close the modal using the reference
    }
  }

  @Input() routes: RouteConfig[] = []
  label?: string = ''

  capitalizeWords(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  formattedRouteName: string = '';
  buttonName: string = ''
  ngOnInit() {

    this.devicesSubscription = this.appStateService.devices$.subscribe(devices => {
      console.log('Devices updated:', devices);
    });
    
    this.myControl.valueChanges.subscribe(value => {
      this.filteredOptions = this.options.filter(option =>
        option.toLowerCase()
      );
    });

    // Get the current route path
    this.router.events.subscribe(() => {
      const routePath = this.router.url; // Get last segment of the route

      if (routePath.includes('add-user')) {
        this.buttonName = 'Crea Utente';
      } else {
        this.buttonName = 'Nuova Dispositvo'; // Set a default button name for other routes
      }
      const matchedRoute = this.routes.find(route => route.path === routePath);
      this.label = matchedRoute ? this.capitalizeWords(matchedRoute?.label) : 'Default Label';
      this.formattedRouteName = routePath; // Default to 'Dashboard' if undefined
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Helper method to capitalize the first letter of the string
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
