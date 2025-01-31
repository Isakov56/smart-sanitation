import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'charts-lib',
  standalone: true,
  imports: [],
  template: `
    <canvas id="chartCanvas" class="p-2"></canvas>
  `,
  styles: ``
})
export class ChartsLibComponent {
  @Input() chartData: any;

  ngOnInit(): void {
    Chart.register(...registerables);
    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie', // or 'bar' or 'line' etc.
      data: this.chartData
    });
  }
}
