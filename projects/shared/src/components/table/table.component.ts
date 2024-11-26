// src/app/shared/table/table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,  // Mark this component as standalone
  imports: [CommonModule],
  template: `
    <table class="table w-100">
      <thead>
        <tr>
          <th *ngFor="let column of columns">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let column of columns">{{ row[column] }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
}

