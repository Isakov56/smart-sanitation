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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SensorService } from 'core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


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

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {
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
    this.isPersistent = !this.isPersistent;  // Toggle the persistent state
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
    private modalService: NgbModal, private appStateService: AppStateService, private cdr: ChangeDetectorRef, private sensorService: SensorService,) {
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

    this.sensorService.getSensors(true).subscribe((sensors) => {
      this.sensors = sensors.map((sensor) => ({
        ...sensor,
        control: new FormControl(this.checkboxStates[sensor.id] || false),
      }));
  
      // Preserve checkbox state
      this.sensors.forEach((sensor) => {
        sensor.control.valueChanges.subscribe((isChecked: any) => {
          this.checkboxStates[sensor.id] = isChecked;
        });
      });
    });

    this.appStateService.devicesWithSensors$.subscribe(devices => {
      // console.log('Devices updated:', devices);
      // Here you can update the layout or other relevant state based on devices
    });

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
    this.router.events.subscribe(() => {
      const routePath = this.router.url; // Get last segment of the route

      if (routePath.includes('infrastruttura')) {
        this.label = 'Infrastruttura';
      } else if (routePath.includes('asset')) {
        this.label = 'Asset';
      } else if (routePath.includes('sensori')) {
        this.label = 'Sensori';
      } else {
        // Check against your routes array for other matches
        const matchedRoute = this.routes.find(route => route.path === routePath);
        this.label = matchedRoute ? this.capitalizeWords(matchedRoute.label) : ''; // Default to empty string
      }
      this.formattedRouteName = routePath; // Default to 'Dashboard' if undefined

      this.cdr.detectChanges();
    });
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
