import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input() chartData!: ChartData<'pie'>;
  @Input() chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart<'pie'>;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private initializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart<'pie'>(ctx, {
        type: 'pie',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.chart) {
      this.chart.resize(); // Adjusts chart size without recreating
    }
  }
}



