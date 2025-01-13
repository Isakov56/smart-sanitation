import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, MatIcon, MatSlideToggle],
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
            }" (click)="onRowClick(row)">
          <td *ngFor="let key of columns.length > 0 ? columns : objectKeys(row)" >
            {{ row[key] }}
          </td>
          <!-- Add an additional cell for the icon if provided -->
          <td *ngIf="icon">
            <!-- <i [class]="icon"></i>  -->
            <mat-icon [fontIcon]="icon"
                  class="material-symbols-outlined w-100 h-100 icon d-flex align-items-center justify-content-center"></mat-icon>
          </td>
          <td *ngIf="icon2">
            <!-- <i [class]="icon"></i>  -->
            <mat-icon [fontIcon]="icon2"
                  class="material-symbols-outlined w-100 h-100 icon d-flex align-items-center justify-content-center"></mat-icon>
          </td>
          <td *ngIf="showToggle">
            <mat-slide-toggle >
            </mat-slide-toggle>
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
  @Input() icon: string | null = null; // Accept an optional icon class
  @Input() icon2: string | null = null; // Accept an optional icon class
  @Input() showToggle: boolean = false;
  @Output() rowSelected = new EventEmitter<any>();
  @Input() targetRoute?: string;
  toggleState: { [key: string]: boolean } = {}; // Store toggle states
  objectKeys = Object.keys;

  constructor(private router: Router) {}

  onRowClick(row: any) {
    // Emit the row data to the parent component (optional)
    this.rowSelected.emit(row);

    // Navigate to the route and pass row data as query params
    if (this.targetRoute) {
      this.router.navigate([this.targetRoute], {
        queryParams: { rowData: JSON.stringify(row) },
      });
    }
  }

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


