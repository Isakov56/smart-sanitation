import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, ChangeDetectorRef  } from '@angular/core';
import { Chart, ChartType, ChartOptions, registerables  } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { CardLoaderComponent } from 'shared';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  imports: [MatCard, CardLoaderComponent, CommonModule],
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() chartType: ChartType = 'bar';
  @Input() data: any;
  @Input() isLoading: boolean = false;
  @Input() options: ChartOptions = { responsive: true, maintainAspectRatio: false };
  @Input() gradientConfig: { startColor: string; endColor: string; direction: 'horizontal' | 'vertical' } = {
    startColor: '#090979', endColor: '#0096b4', direction: 'horizontal'
  };

  constructor(private cdr: ChangeDetectorRef) {}


  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (!this.chartCanvas) return; // Prevent running if canvas isn't available
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context could not be initialized.');
      return;
    }

    
  
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.data,
      options: this.options,
    });
  
    // Add resize listener for manual resizing
    window.addEventListener('resize', this.onResize);
  }


  ngOnChanges(): void {
    if (this.chart && this.data) {
      this.chart.data = this.data;  // Update chart data
      // this.updateChart()  // Re-render the chart with new data
      this.chart.update();
    }
  }
  private createGradient(ctx: CanvasRenderingContext2D): CanvasGradient {
    const canvas = ctx.canvas;
    const gradient = this.gradientConfig.direction === 'horizontal'
      ? ctx.createLinearGradient(0, 0, canvas.width, 0)
      : ctx.createLinearGradient(0, 0, 0, canvas.height);

    gradient.addColorStop(0, this.gradientConfig.startColor);
    gradient.addColorStop(1, this.gradientConfig.endColor);
    return gradient;
  }

  private updateChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      const gradient = this.createGradient(ctx);
      this.data.datasets.forEach((dataset: any) => {
        dataset.backgroundColor = gradient;
      });
      this.chart.update();
    }
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


