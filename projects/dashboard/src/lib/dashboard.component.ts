import { Component, OnInit, ChangeDetectorRef,  } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'shared';
import { PieChartComponent } from 'charts-lib';
import { ChartComponent } from 'charts-lib';
import { WeatherService } from 'core';
import { CardLoaderComponent } from 'shared';
import { delay } from 'rxjs';
import { CardService } from 'core';
import { ValuesService } from 'core';
import { SensorService } from 'core';
import { GridComponent } from 'core';
import { AppStateService } from 'core';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, CardComponent, ChartComponent, PieChartComponent, CardLoaderComponent, GridsterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  styles: ``
})
export class DashboardComponent implements OnInit {
  options: GridsterConfig = {
    draggable: { enabled: true },
    resizable: { enabled: true },
    gridType: 'fit',
    pushItems: true,
    displayGrid: 'onDrag&Resize',
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
  
  
  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef, private cardService: CardService, private valuesService: ValuesService, 
    private sensorService: SensorService, private appStateService: AppStateService) {}

    ngOnInit(): void {
      this.weatherService.getWeatherDataTest('sydney');
    
      // Check if devices are already stored
      const devices = this.appStateService.getDevices();
      if (devices.length === 0) {
        this.cardService.getGridItems().subscribe((devices) => {
          this.devices = devices;
          this.appStateService.setDevices(devices);  // Save devices to AppStateService
        });
      } else {
        this.devices = devices;
      }
    
      // Check if grid layout is already stored
      const layout = this.appStateService.getGridLayout();
      if (layout.length === 0) {
        this.layout = this.devices.map((device) => ({
          id: device.id,
          x: device.x || 0,
          y: device.y || 0,
          cols: device.cols || 1,
          rows: device.rows || 1,
        }));
        this.appStateService.setGridLayout(this.layout);
      } else {
        this.layout = layout;
      }
    
      // Fetch sensors and update chart data when necessary
      this.sensorService.getSensors().subscribe((sensors) => {
        this.devicesWithSensors = this.devices.map((device) => {
          const deviceSensors = sensors.filter(
            (sensor) => sensor.deviceId === device.id
          );
          return { ...device, sensors: deviceSensors };
        });
    
        // Store the sensors if necessary
        this.appStateService.setSensors(sensors);
        
        // Only update chart data when sensor values change
        this.updateChartData(sensors);
      });
    
      // If chart data is available, use it
      const savedChartData = this.appStateService.getChartData();
      if (savedChartData.length === 0) {
        this.fetchAndSaveChartData();  // Fetch and save chart data if not available
      } else {
        this.chartData = savedChartData;  // Use saved chart data
      }
    }
    
    // Fetch and save chart data when necessary
    fetchAndSaveChartData(): void {
      // Example logic for fetching chart data (replace with actual API call)
      this.cardService.getGridItems().subscribe((data) => {
        this.chartData = data;
        this.appStateService.setChartData(data);  // Save chart data to AppStateService
      });
    }
    
    // Update chart data based on sensors
    updateChartData(sensors: any[]): void {
      const updatedChartData = this.chartData.map((data) => {
        const correspondingSensor = sensors.find((sensor) => sensor.deviceId === data.deviceId);
        if (correspondingSensor) {
          return {
            ...data,
            value: correspondingSensor.value,  // Update value based on sensor
          };
        }
        return data;
      });
    
      this.appStateService.setChartData(updatedChartData);  // Save updated chart data
    }
    
    

  onGridChange(newLayout: any): void {
  this.appStateService.setGridLayout(newLayout);
}

  getDeviceData(deviceId: number): any {
    return this.devicesWithSensors.find((device) => device.id === deviceId) || {};
  }

  idValueFunction(id: number): any {
    this.idValue = this.valuesService.getValuesGridByID(id)
  }

  

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
