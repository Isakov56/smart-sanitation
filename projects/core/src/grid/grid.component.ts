import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [GridsterModule, CommonModule],
  template: `
    <gridster [options]="options" class="grid-container">
      <gridster-item *ngFor="let item of gridItems; trackBy: trackByFn" [item]="item">
        <div class="grid-item-card">
        </div>
      </gridster-item>
    </gridster>
  `,
  styles: [`
    .grid-container {
      height: 100vh;
    }
    .grid-item-card {
      padding: 10px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
  `]
})
export class GridComponent implements OnChanges {
  @Input() gridItems: GridsterItem[] = [
    { id: 1, x: 0, y: 0, cols: 2, rows: 1, content: 'Card 1' },
    { id: 2, x: 2, y: 0, cols: 1, rows: 1, content: 'Card 2' },
    { id: 3, x: 0, y: 1, cols: 1, rows: 2, content: 'Card 3' },
  ];

  options: GridsterConfig = {
    draggable: { enabled: true },
    resizable: { enabled: true },
    gridType: 'fit',
    pushItems: true,
    displayGrid: 'onDrag&Resize',
    itemChangeCallback: (item) => console.log('Item changed', item),
    itemResizeCallback: (item) => console.log('Item resized', item),
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridItems'] && changes['gridItems'].currentValue) {
      console.log('Grid items updated:', changes['gridItems'].currentValue);
    }
  }

  trackByFn(index: number, item: GridsterItem): number | string {
    return item['id'] || index; // Ensure unique tracking by `id` or fallback to index
  }
}
