import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'shared'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'shared';
import { ReportsService } from './reports.service';

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

  constructor(private tableStateService: ReportsService) {}

  ngOnInit(): void {
    this.generateCards(9);
    this.tableStateService.getTableState().subscribe((state) => {
      this.isTable = state;
    })
  }

  columns = ['Sala operatoria', 'Data', 'Data del lavaggio', 'Esito lavaggio'];
  data = [
    { 'Sala operatoria': 'John', 'Data': 30, 'Data del lavaggio': '2021-12-01', 'Esito lavaggio': '87%' },
    { 'Sala operatoria': 'Jane', 'Data': 25, 'Data del lavaggio': '2021-12-02', 'Esito lavaggio': '92%' }
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
    this.tableStateService.setTableState(showTable);
  }

}
