import { Component, inject, Input, OnInit, TemplateRef, ChangeDetectorRef, ViewChild, AfterViewInit   } from '@angular/core';
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
import { NavigationEnd, RouterModule } from '@angular/router';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SensorService } from 'core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from 'core';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'core';
import { selectAllSensors, selectSensorsLoading, selectSensorsError, selectAllDevices } from 'test-store-lib';
import { DataState } from 'test-store-lib'; 
import { loadSensors, loadDevices } from 'test-store-lib';
import { Store } from '@ngrx/store';
import { SensorsItem } from 'test-store-lib'

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
    ReactiveFormsModule,
    MatCheckboxModule,
    NgbDropdownModule,
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, AfterViewInit  {
  isHovered: boolean = false
  isPersistent = true;
  sensors: any[] = [];

  myControl = new FormControl('');
  options: string[] = ['Pie', 'Bar', 'Line'];
  filteredOptions: Observable<string[]> | undefined;

  settingsHovered: boolean = false;

  deviceForm = new FormGroup({
    title: new FormControl('', Validators.required),
    id: new FormControl(5, Validators.required),
    chartType: new FormControl('', Validators.required),
    cols: new FormControl(4, Validators.required),
    rows: new FormControl(4, Validators.required),
  });

  sensors$: SensorsItem[] = [];
  devices$: Observable<any[]> | undefined;

  logout() {
    this.authService.logout();  // Clear the token from localStorage
    this.router.navigate(['/login']);  // Navigate to the login page
  }

  @ViewChild('drawer') drawer!: MatDrawer;
  onMouseEnter(label: string): void {
    if (label === 'Settings') {
      this.settingsHovered = true;
    }
  }

  // Method to handle mouseleave event
  onMouseLeave(): void {
    this.settingsHovered = false;
  }

  private devicesSubscription!: Subscription;

  isDashboardPage = false;

  modalRef: any;
  checkboxStates: { [key: number]: boolean } = {};

  onPersistenceChange(): void {
    this.layoutService.toggleSidebar();
    if (this.isPersistent) {
      // Open the drawer if persistence is enabled
      console.log('Sidenav persistence enabled');
    } else {
      console.log('Sidenav persistence disabled');
    }
  }

  clearClose(): void {
    this.sensors.forEach(sensor => (sensor.selected = false));
  const currentDevices = this.appStateService.getDevices();
  this.closeModal();
  this.cdr.detectChanges();
  this.deviceForm.reset({
    title: '',
    chartType: '',
    id: currentDevices.length + 2,
    cols: 4,
    rows: 4
  });
  }

  getRole(): string {
    return this.isHandset$ ? 'navigation' : 'navigation';
  }

  // This method returns the sidenav mode based on the isPersistent flag and the handset mode
  getSidenavMode(): 'over' | 'push' | 'side' {
    return this.isPersistent ? 'side' : 'over';
  }

  // This method determines whether the sidenav is opened or not
  getSidenavOpened(): boolean {
    return this.isPersistent 
  }

  toggleSidenav(): void {
    // this.isPersistent = !this.isPersistent;  // Toggle the persistent state
    this.cdr.detectChanges();
    // this.test.toggle(); // Toggle the mat-drawer visibility
    this.layoutService.toggleSidebar();
    this.drawer.toggle();
  }

  addDevice(): void {
    if (this.deviceForm.valid) {
      const currentDevices = this.appStateService.getDevices();
      const newDevice = { ...this.deviceForm.value, id: currentDevices.length + 1 }
      this.appStateService.setDevices([...currentDevices, newDevice]);

      this.closeModal();
      this.cdr.detectChanges();
      this.deviceForm.reset({
        title: '',
        id: currentDevices.length + 2,
        chartType: '',
        cols: 4 ,
        rows: 4
      });
    }
  }

  isUserPage(): boolean {
    return this.router.url === '/user';
  }

  addDeviceTest(): void {
    if (this.deviceForm.valid) {
      const currentDevices = this.appStateService.getDevices();
    
      // Extract selected sensors
      const selectedSensors = this.sensors
        .filter(sensor => sensor.control.value) // Only include selected sensors
        .map(sensor => ({
          id: sensor.id,
          name: sensor.name,
          type: sensor.type,
          value: sensor.value, // Include all necessary fields from the sensor
          unit: sensor.unit,
          status: sensor.status,
          color: sensor.color
        }));
    
      const newDevice = {
        ...this.deviceForm.value,
        id: currentDevices.length + 1, // Auto-generate a new ID
        sensors: selectedSensors // Attach selected sensors to the new device
      };
    
      // Update the devices list in the app state
      this.appStateService.setDevices([...currentDevices, newDevice]);
      this.appStateService.setDevicesWithSensors([...currentDevices, newDevice]);
  
      // Optional: Log the new device
      console.log('New Device Created:', [...currentDevices, newDevice]);
  
      // Reset form and close modal
      this.clearClose();
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
    const excludedRoutes = ['reports', 'aggiungi-dispositivo', 'add-user', 'user', 'infrastruttura', 'asset', 'sensori']; // Add more routes as needed
    return excludedRoutes.some(route => this.router.url.includes(route));
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private router: Router, private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private modalService: NgbModal, private appStateService: AppStateService, private cdr: ChangeDetectorRef, private sensorService: SensorService,
    private layoutService: LayoutService, private authService: AuthService, private store: Store
    // private test: MatDrawer
  ) {
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
  label: string = ''
  userData: any = null;

  capitalizeWords(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  formattedRouteName: string = '';
  buttonName: string = ''
  private sidebarToggleSubscription: Subscription | undefined;
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  private setLabelFromRoute(routePath: string): void {
    if (routePath.includes('infrastruttura')) {
      this.label = 'Infrastruttura';
    } else if (routePath.includes('asset')) {
      this.label = 'Asset';
    } else if (routePath.includes('user')) {
      this.label = 'Utente';
    }
    else if (routePath.includes('sensori')) {
      this.label = 'Sensori';
    } else {
      const matchedRoute = this.routes.find(route => route.path === routePath);
      this.label = matchedRoute ? this.capitalizeWords(matchedRoute.label) : '';
    }
    this.formattedRouteName = routePath;
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {

    this.store.dispatch(loadSensors());
    this.store.select(selectAllSensors).subscribe(data => {
      if (data) {
        this.sensors$ = data;
      }
      // this.cdr.detectChanges();
    });

    // console.log('Drawer is initialized:', this.drawer);
    if (this.drawer) {
    }

    const userInfo = localStorage.getItem('user_info'); // 'user_info' is the key in localStorage

    if (userInfo) {
      this.userData = JSON.parse(userInfo); // Parse the JSON string into an object

    } else {
      console.warn('No user data found in localStorage!');
    }

    // this.sensorService.getSensors(true).subscribe((sensors) => {
    //   this.sensors = sensors.map((sensor) => ({
    //     ...sensor,
    //     control: new FormControl(this.checkboxStates[sensor.id] || false),
    //   }));
  
    //   // Preserve checkbox state
    //   this.sensors.forEach((sensor) => {
    //     sensor.control.valueChanges.subscribe((isChecked: any) => {
    //       this.checkboxStates[sensor.id] = isChecked;
    //     });
    //   });
    // });

    // this.appStateService.devicesWithSensors$.subscribe(devices => {
    //   // console.log('Devices updated:', devices);
    //   // Here you can update the layout or other relevant state based on devices
    // });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.myControl.valueChanges.subscribe(selectedValue => {
      if (selectedValue && this.options.includes(selectedValue)) {
        this.deviceForm.get('chartType')?.setValue(selectedValue.toLowerCase());
      }
    })

    this.devicesSubscription = this.appStateService.devices$.subscribe(devices => {
      // console.log('Devices updated:', devices);
    });

    this.isDashboardPage = this.router.url.includes('dashboard');
    // console.log(this.isDashboardPage, 'dashboard')
    // this.myControl.valueChanges.subscribe(value => {
    //   this.filteredOptions = this.options.filter(option =>
    //     option.toLowerCase()
    //   );
    // });

    // Get the current route path
    this.setLabelFromRoute(this.router.url);

    // Subscribe to router events to update label on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setLabelFromRoute(this.router.url);
      }
    });
    this.cdr.detectChanges();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // Helper method to capitalize the first letter of the string
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
