import { Component, OnInit, ChangeDetectorRef, inject, Input, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'shared';
import { PieChartComponent } from 'charts-lib';
import { ChartComponent } from 'charts-lib';
import { WeatherService } from 'core';
import { CardLoaderComponent } from 'shared';
import { delay, Observable } from 'rxjs';
import { CardService } from 'core';
import { ValuesService } from 'core';
import { SensorService } from 'core';
import { GridComponent } from 'core';
import { AppStateService } from 'core';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { combineLatest,  } from 'rxjs';
import { TableComponent } from 'shared'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Store } from '@ngrx/store';
import { loadSensors } from 'ngrx-store';



@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, CommonModule,
    //  CardComponent, 
    // PieChartComponent, CardLoaderComponent, TableComponent, 
    ChartComponent,  GridsterModule,
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  styles: ``
})

export class DashboardComponent implements OnInit {

  
  options: GridsterConfig = {
    draggable: { 
      enabled: true,
      stop: (event, item) => this.onGridChange() // Call on drag stop
    },
    resizable: { 
      enabled: true, // Always allow resizing
    stop: () => this.onGridChange(), // Call on resize stop
    },
    gridType: 'verticalFixed',
    fixedRowHeight: 85,
    pushItems: true,
    displayGrid: 'onDrag&Resize',
    compactType: 'none',
    mobileBreakpoint: 500, // Disable mobile-specific behavior (set breakpoint to 0)
    maxCols: 12,
    // maxItemCols: 4,
    // maxRows: 6,
    // maxItemRows: 3
  };
  gridItems: GridsterItem[] = [
    { x: 0, y: 0, cols: 2, rows: 1, content: 'Card 1' },
    { x: 2, y: 0, cols: 1, rows: 1, content: 'Card 2' },
    { x: 0, y: 1, cols: 1, rows: 2, content: 'Card 3' },
  ];
  values: any[] = [];
  idValue: any = ''
  cards: any[] = [];
  devices: any[] = [];
  weatherData: any;
  testChartData?: any;
  isLoading = true;
  devicesWithSensors: any[] = [];
  layout: any[] = [];
  chartData!: any[];
  
  devicesWithSensors$!: Observable<any[]>;

  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef, private cardService: CardService, private valuesService: ValuesService,
    private sensorService: SensorService, private appStateService: AppStateService, private http: HttpClient, private store: Store) { }

    subscribeId: string | null = null; // Store subscription ID
  isStreaming: boolean = false; // Toggle streaming
  videoStreamUrl: string = 'https://cors-anywhere.herokuapp.com/http://192.168.25.16:8094/stream'; // Stream URL
  xhr: XMLHttpRequest | null = null;

  getSubscriptionId(): void {
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set up the request to fetch headers from the stream URL
    xhr.open('HEAD', this.videoStreamUrl, true); // Use 'HEAD' request to get headers
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Get the 'X-Subscribe-Id' header
        this.subscribeId = xhr.getResponseHeader('X-Subscribe-Id');
        console.log('Subscription ID:', this.subscribeId);
      }
    };

    // Send the request
    xhr.send();
  }

  // Method to start/stop the stream
  toggleStream(): void {
    this.isStreaming = !this.isStreaming; // Toggle streaming state

    // If starting the stream, set the iframe src URL
    if (this.isStreaming) {
      this.videoStreamUrl = 'https://cors-anywhere.herokuapp.com/http://192.168.25.16:8094/stream';
    } else {
      this.videoStreamUrl = ''; // Clear the stream URL to stop streaming
    }
  }


    ngOnInit(): void {

      this.store.dispatch(loadSensors());
      
      this.getSubscriptionId();

      // this.http.head('http://192.168.25.16:8094/stream', { observe: 'response' })
      // .subscribe(
      //   (response) => {
      //     this.subscribeId = response.headers.get('X-Subscribe-Id');
      //     console.log(this.subscribeId, 'subscribe id');
      //   },
      //   (error) => {
      //     console.error('Error fetching subscribe ID:', error);
      //   }
      // );
      

      // Fetch and set devices with sensors as an Observable
      this.devicesWithSensors$ = this.appStateService.devicesWithSensors$;
    
      // Subscribe to layout changes and update layout dynamically
      this.appStateService.devices$.subscribe((devices) => {
        // this.initializeLayout(devices);
        console.log(devices, 'devices kjhkh')
        this.layout = devices

        this.onGridChange();
        // this.updateDevicesWithSensors(devices);  // Ensure devices and sensors are synchronized here
      });
    
      // Fetch initial devices if not already loaded
      const devices = this.appStateService.getDevices();
      
      if (devices.length === 0) {
        this.cardService.getGridItems().subscribe((fetchedDevices) => {
          this.devices = fetchedDevices;
          console.log('Fetched devices:', fetchedDevices);
          this.appStateService.setDevices(fetchedDevices);
          
          this.cdr.detectChanges();
    
          // this.initializeLayout(fetchedDevices);
          // this.initializeSensors(fetchedDevices); // Initial sensors assignment
        });
      } else {
        // this.devices = devices;
        // this.initializeLayout(devices);
        // this.initializeSensors(devices); // Initial sensors assignment
      }
    }

  

  onGridChange(): void {
    console.log('Grid layout changed:', this.layout);
    // this.appStateService.setGridLayout(this.layout); // Save updated layout
    this.cdr.detectChanges();
  }

  private initializeLayout(devices: any[]): void {
    this.cardService.getGridItems().subscribe((currentLayout) => {
      const newLayout = devices.map((device) => ({
        id: device.id,
        x: device.x || 0,
        y: device.y || 0,
        cols: device.cols || 1,
        rows: device.rows || 1,
      }));
  
      // Merge layouts: retain existing device positions and add new ones
      this.layout = [
        ...currentLayout.filter((layoutItem: { id: any }) =>
          devices.some(device => device.id === layoutItem.id)
        ),
        ...newLayout.filter(newLayoutItem =>
          !currentLayout.some((layoutItem: { id: any }) => layoutItem.id === newLayoutItem.id)
        )
      ];
    });
    this.appStateService.setGridLayout(this.layout);
  }

  private updateDevicesWithSensors(devices: any[]): void {
    // Set flag to prevent update from overwriting new devices
    // this.sensorService.setSkipSensorUpdate(true);
  
    this.sensorService.getSensors(false).subscribe((sensors) => {
      // Map the devices to include sensors, but only update those with existing devices
      const devicesWithSensors = devices.map((device) => ({
        ...device,
        sensors: sensors.filter((sensor) => sensor.deviceId === device.id),
      }));
  
      // Update the app state with devices that now include sensors
      // this.appStateService.setDevicesWithSensors(devicesWithSensors);
  
      // After the update, allow sensor updates again
      this.sensorService.setSkipSensorUpdate(false);
    });
  }

  private initializeSensors(devices: any[]): void {
    if (!devices || devices.length === 0) {
      console.log('No devices to initialize sensors for.');
      return;
    }
  
    this.sensorService.getSensors().subscribe((sensors) => {
      // Map sensors to the respective devices
      this.devicesWithSensors = devices.map((device) => ({
        ...device,
        sensors: sensors.filter((sensor) => sensor.deviceId === device.id),
      }));
  
      // console.log('Updated devices with sensors:', this.devicesWithSensors);
  
      // Update the app state with the new devicesWithSensors
      this.appStateService.setDevicesWithSensors(this.devicesWithSensors);
    });
  }
  

  getDeviceFromObservable(devices: any[] | null, id: number): any | null {
    if (!devices) return null; // Handle null case for the Observable
    return devices.find((device) => device.id === id) || null;
  }
  // Fetch and save chart data when necessary
  fetchAndSaveChartData(): void {
    // Example logic for fetching chart data (replace with actual API call)
    // this.cardService.getGridItems().subscribe((data) => {
    //   this.chartData = data;
    //   this.appStateService.setChartData(data);  // Save chart data to AppStateService
    // });
  }

  // Update chart data based on sensors
  updateChartData(sensors: any[]): void {
    // const updatedChartData = this.chartData.map((data) => {
    //   const correspondingSensor = sensors.find((sensor) => sensor.deviceId === data.deviceId);
    //   if (correspondingSensor) {
    //     return {
    //       ...data,
    //       value: correspondingSensor.value,  // Update value based on sensor
    //     };
    //   }
    //   return data;
    // });

    // this.appStateService.setChartData(updatedChartData);  // Save updated chart data
  }



  //   onGridChange(newLayout: any): void {
  //   this.appStateService.setGridLayout(newLayout);
  // }


  // idValueFunction(id: number): any {
  //   this.idValue = this.valuesService.getValuesGridByID(id)
  // }



  // getWeatherData(city: string): void {
  //   this.weatherService.getWeatherData(city). pipe(delay(0)).subscribe(data => {
  //     this.weatherData = data; // Store weather data
  //     this.prepareChartData(data);  // Prepare chart data based on weather data
  //     this.isLoading = false;
  //   });
  // }

  // prepareChartData(weatherData: any): void {
  //   if (weatherData && weatherData.main) {
  //     this.testChartData = {
  //       labels: ['Morning', 'Afternoon', 'Evening'],
  //       datasets: [
  //         {
  //           label: 'Temperature (°C)',
  //           data: [weatherData.main.temp, 23, 20],
  //           borderColor: 'rgba(75,192,192,1)',
  //           backgroundColor: 'rgba(75,192,192,0.2)',
  //           fill: true,
  //         }
  //       ]
  //     };
  //   }
  // }


  generateCards(count: number): void {
    const sampleCard = {
      title: 'Shiba Inu',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      alt: 'Photo of a Shiba Inu',
      content: '',
    };

    this.cards = Array.from({ length: count }, () => ({ ...sampleCard }));
  }

  // pieChartData = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
  //   datasets: [
  //     {
  //       data: [30, 20, 10, 25, 15],
  //       label: 'Sales',
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //     },
  //   ],
  // };

  // barChartData = {
  //   labels: ['January', 'February', 'March'],
  //   datasets: [
  //     {
  //       data: [65, 59, 80],
  //       label: 'Colors',
  //       backgroundColor: 'green',
  //     },
  //   ],
  // };
}
