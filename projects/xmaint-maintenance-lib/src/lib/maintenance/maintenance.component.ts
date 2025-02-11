import { Component, OnInit } from '@angular/core';
import { CardComponent } from 'xmaint-shared-lib';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'xmaint-shared-lib'
import { FiltersComponent } from 'xmaint-shared-lib'

@Component({
  selector: 'lib-maintenance',
  standalone: true,
  imports: [ CommonModule, 
    TableComponent, FiltersComponent

  ],
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

  columns = ['Data', 'Infrastruttura', 'Asset', 'Sensore', 'Tipo di manutenzione'];
  data: any[] = [
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
   
  ];
}
