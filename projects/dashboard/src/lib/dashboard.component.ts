import { Component, OnInit  } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'shared';
import { PieChartComponent } from 'charts-lib';
import { BarChartComponent } from 'charts-lib';

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

  constructor() {}

  ngOnInit(): void {
    this.generateCards(6); // Adjust the number of cards here
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
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  barChartData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        data: [65, 59, 80],
        label: 'Sales',
        backgroundColor: 'green',
      },
    ],
  };
}
