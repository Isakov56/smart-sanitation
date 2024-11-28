import { Component, OnInit } from '@angular/core';
import { CardComponent } from 'shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-monitoring',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './monitring.component.html',
  styleUrl: './monitring.component.scss'
})
export class MonitoringComponent implements OnInit{
  cards: any[] = [];

  generateCards(count: number): void {
    this.cards = Array.from({ length: count }, () => ({  }));
  }

  ngOnInit(): void {
    this.generateCards(4);
  }
}
