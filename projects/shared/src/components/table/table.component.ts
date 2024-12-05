// src/app/shared/table/table.component.ts
import { Component, Input } from '@angular/core';
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
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() startWithEven: boolean = true;
  objectKeys = Object.keys;
}

