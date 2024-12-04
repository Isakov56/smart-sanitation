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

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, CardComponent, ChartComponent, PieChartComponent, CardLoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  styles: ``
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];
  weatherData: any;
  testChartData?: any;
  isLoading = true;
  
  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.generateCards(3);
    // this.weatherService.isAlive()
    // this.weatherService.logEvery30Seconds()
    this.weatherService.getWeatherDataTest('sydney')
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
