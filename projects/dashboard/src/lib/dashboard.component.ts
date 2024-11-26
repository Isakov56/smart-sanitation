import { Component, OnInit  } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'shared';
import { PieChartComponent } from 'charts-lib';
import { BarChartComponent } from 'charts-lib';
import { WeatherService } from 'core';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, CardComponent, BarChartComponent, PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  styles: ``
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];
  weatherData: any;
  testChartData?: any;
  
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.generateCards(6);
    this.getWeatherData('London');
    console.log(this.testChartData)
  }

  getWeatherData(city: string): void {
    this.weatherService.getWeatherData(city).subscribe(data => {
      this.weatherData = data; // Store weather data
      this.prepareChartData();  // Prepare chart data based on weather data
      console.log(this.weatherData.main, 'kjhkjh')
    });
  }

  prepareChartData(): void {
    if (this.weatherData) {
      // Example: prepare bar chart data using weather temperature data
      this.testChartData = {
        labels: ['Morning', 'Afternoon', 'Evening'],
        datasets: [
          {
            label: 'Temperature (°C)',
            data: [
              this.weatherData.main.temp,  // Current temperature
              23,  // Example static data
              20   // Example static data
            ],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true
          }
        ]
      };
    }
  }

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

  pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
    datasets: [
      {
        data: [30, 20, 10, 25, 15],
        label: 'Sales',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  barChartData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        data: [65, 59, 80],
        label: 'Colors',
        backgroundColor: 'green',
      },
    ],
  };
}
