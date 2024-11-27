// src/app/shared/table/table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,  // Mark this component as standalone
  imports: [CommonModule],
  template: `
    <div>
      
    </div>
    <table class="table w-100 pe-2">
      <thead>
        <tr class="d-felx justify-content-center">
          <th *ngFor="let column of columns" class="">{{ column }}</th>
        </tr>
      </thead>
      <tbody class="">
          <tr *ngFor="let row of data" class="">
            <td *ngFor="let column of columns" class="">{{ row[column] }}</td>
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

