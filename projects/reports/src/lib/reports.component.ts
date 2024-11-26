import { Component } from '@angular/core';
import { TableComponent } from 'shared'

@Component({
  selector: 'lib-reports',
  standalone: true,
  imports: [TableComponent],
  template: `
    <app-table [columns]="columns" [data]="data" class="w-100"></app-table>
  `,
  styles: ``
})
export class ReportsComponent {
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
}
