import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'shared'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'shared';

@Component({
  selector: 'lib-reports',
  standalone: true,
  imports: [TableComponent, MatIconModule, CommonModule, CardComponent],
  templateUrl: './reports.components.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{
  isTable = true;
  cards: any[] = [];

  ngOnInit(): void {
    this.generateCards(9);
  }

  columns: string[] = ['Sala operatoria', 'Data', 'Data del lavaggio', 'Esito lavaggio'];
  data: any[] = [
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'John', Data: 30, 'Data del lavaggio': 'New York', 'Esito lavaggio': '87%' },
   
  ];

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

  setTableView(showTable: boolean): void {
    this.isTable = showTable;
    console.log('pushed pushed', this.isTable)
  }

}
