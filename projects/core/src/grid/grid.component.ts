import { Component } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [GridsterModule],
  template: `
    <gridster [options]="options">
      <gridster-item *ngFor="let item of gridItems" [item]="item">
        <div class="card">{{ item.content }}</div>
      </gridster-item>
    </gridster>
  `,
  styles: [`
    .card {
      padding: 10px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      text-align: center;
    }
  `]
})
export class GridComponent {
  options: GridsterConfig = {
    draggable: { enabled: true },
    resizable: { enabled: true },
    gridType: 'fit',
    pushItems: true,
    displayGrid: 'onDrag&Resize',
  };

  gridItems: GridsterItem[] = [
    { x: 0, y: 0, cols: 2, rows: 1, content: 'Card 1' },
    { x: 2, y: 0, cols: 1, rows: 1, content: 'Card 2' },
    { x: 0, y: 1, cols: 1, rows: 2, content: 'Card 3' },
  ];
}
