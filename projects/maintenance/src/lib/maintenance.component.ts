import { Component, OnInit } from '@angular/core';
import { CardComponent } from 'shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-maintenance',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './maintenance.components.html',
  styleUrl: './maintenance.components.scss'
})
export class MaintenanceComponent implements OnInit{

  cards: any[] = [];

  generateCards(count: number): void {
    this.cards = Array.from({ length: count }, () => ({  }));
  }

  ngOnInit(): void {
    this.generateCards(4);
  }
}
