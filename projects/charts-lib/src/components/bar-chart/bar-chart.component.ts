import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartType, ChartOptions, registerables  } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements AfterViewInit, OnDestroy {
  @Input() chartType: ChartType = 'bar';
  @Input() data: any;
  @Input() options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  @Input() gradientConfig?: {
    startColor: string;
    endColor: string;
    direction: 'horizontal' | 'vertical';
  };

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context could not be initialized.');
      return;
    }

    if (this.gradientConfig) {
      const gradient = this.createGradient(ctx);
      this.data.datasets.forEach((dataset: any) => {
        dataset.backgroundColor = gradient;
      });
    }

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.data,
      options: this.options,
    });

    // Add resize listener for manual resizing
    window.addEventListener('resize', this.onResize);
  }

  private createGradient(ctx: CanvasRenderingContext2D): CanvasGradient {
    const canvas = ctx.canvas;
    const gradient = this.gradientConfig?.direction === 'horizontal'
      ? ctx.createLinearGradient(0, 0, canvas.width, 0)
      : ctx.createLinearGradient(0, 0, 0, canvas.height);

    gradient.addColorStop(0, this.gradientConfig?.startColor || '#000');
    gradient.addColorStop(1, this.gradientConfig?.endColor || '#FFF');
    return gradient;
  }

  private onResize = () => {
    if (this.chart) {
      this.chart.resize(); // Manually trigger chart resize
    }
  };

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Clean up the chart instance
    }
    window.removeEventListener('resize', this.onResize); // Remove resize listener
  }
}

