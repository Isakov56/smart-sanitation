import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,  // Mark this component as standalone
  imports: [CommonModule],
  template: `
    <table class="table">
      <thead *ngIf="columns.length > 0">
        <tr>
          <th *ngFor="let column of columns">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data; let i = index" 
            [ngClass]="{
              'even-row': (i % 2 === 0) !== startWithEven, 
              'odd-row': (i % 2 !== 0) !== startWithEven
            }">
          <td *ngFor="let key of columns.length > 0 ? columns : objectKeys(row)">
            {{ row[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() startWithEven: boolean = true;
  objectKeys = Object.keys;

  // Default values for columns and data
  defaultColumns: string[] = ['Column 1', 'Column 2', 'Column 3'];
  defaultData: any[] = [
    { 'Column 1': 'Data 1', 'Column 2': 'Data 2', 'Column 3': 'Data 3' },
    { 'Column 1': 'Data 4', 'Column 2': 'Data 5', 'Column 3': 'Data 6' },
  ];

  ngOnInit(): void {
    // Set default data if no data is passed
    if (this.data.length === 0) {
      this.data = this.defaultData;
      this.columns = this.columns.length === 0 ? this.defaultColumns : this.columns;
    }
  }
}


