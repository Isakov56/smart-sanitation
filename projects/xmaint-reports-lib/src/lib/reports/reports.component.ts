import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'xmaint-shared-lib'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'xmaint-shared-lib';
import { ReportsService } from './reports.service';
import { FiltersComponent } from 'xmaint-shared-lib';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'lib-reports',
  standalone: true,
  imports: [TableComponent, MatIconModule, CommonModule, CardComponent, FiltersComponent, RouterModule],
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

  columns = ['ID', 'Titolo', 'Data', 'Tipo'];
  data: any[] = [
    { 'ID': '1908374', 'Titolo': 'Reoprt 1', 'Data': '13/01/2025', 'Tipo': 'Primo livello' },
    { 'ID': '3456564', 'Titolo': 'Reoprt 2', 'Data': '13/01/2025', 'Tipo': 'Primo livello' },
    { 'ID': '1986784', 'Titolo': 'Reoprt 3', 'Data': '13/01/2025', 'Tipo': 'Secondo livello' },
    { 'ID': '8784567', 'Titolo': 'Reoprt 4', 'Data': '13/01/2025', 'Tipo': 'Primo livello' },
    { 'ID': '6479654', 'Titolo': 'Reoprt 5', 'Data': '13/01/2025', 'Tipo': 'Secondo livello' },
    { 'ID': '6576570', 'Titolo': 'Reoprt 6', 'Data': '13/01/2025', 'Tipo': 'Primo livello' },
    { 'ID': '2345543', 'Titolo': 'Reoprt 7', 'Data': '13/01/2025', 'Tipo': 'Primo livello' },
    
   
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
