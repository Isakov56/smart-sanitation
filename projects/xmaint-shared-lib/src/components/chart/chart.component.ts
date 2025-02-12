import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, ChangeDetectorRef, OnInit  } from '@angular/core';
import { Chart, ChartType, ChartOptions, registerables  } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { CardLoaderComponent } from '../card-loader/card-loader.component';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'core';
import { animation } from '@angular/animations';
import { TableComponent } from '../table/table.component'

// import { WeatherService } from 'core';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  imports: [MatCard, CardLoaderComponent, CommonModule,],
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  
  @Input() chartType: ChartType = 'bar';
  @Input() data: any;
  @Input() options: ChartOptions = { responsive: true, maintainAspectRatio: false };
  @Input() gradientConfig = { 
    startColor: '#090979', 
    endColor: '#0096b4', 
    direction: 'horizontal' 
  };

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  constructor(private cdr: ChangeDetectorRef) {}

  layout1 = [
    {
      x: 0,
      y: 0,
      rows: 2,
      cols: 2,
      chartData: {
        title: 'Temperature',
        chartType: 'line',
        sensors: [
          { id: 1, value: 22, color: '#FF6384' },
          { id: 2, value: 24, color: '#36A2EB' },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    },
    // Add more items as needed
  ];

  ngOnChanges(): void {
    // console.log('Data received in ChartComponent:', this.data);
    if (this.chart) {
      this.updateChartData(); // Update data if the chart already exists
    } else {
      // this.initializeChart(); // Initialize the chart for the first time
    }
  }

  ngAfterViewInit(): void {
    // console.log(this.data, 'from charts')
    this.initializeChart();
    window.addEventListener('resize', this.onResize);
    // console.log(this.data, 'data data dat dad atad afjhgkjhghjgjh')
  }

  private initializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    // console.log('Canvas Context:', ctx);
    if (!ctx) {
      console.error('Canvas context could not be initialized.');
      return;
    }
  
    if (this.chart) {
      this.chart.destroy(); // Destroy any existing chart
    }
  
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.transformToChartData(this.data),
      options: this.options,
    });
  }

  private transformToChartData(data: any): any {
    if (!data || !data.sensors) return null;

    // Function to add transparency to colors
    const addTransparency = (color: string, alpha: number): string => {
        if (color.startsWith('#')) {
            // Convert hex to rgba
            const hex = color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return `rgba(${r},${g},${b},${alpha})`;
        } else if (color.startsWith('rgb')) {
            // If it's already rgb, add alpha
            return color.replace('rgb', 'rgba').replace(')', `,${alpha})`);
        }
        return color; // Default case: return as is
    };

    return {
        labels: data.sensors.map((sensor: any, index: number) => `Sensor ${sensor.id || index + 1}`),
        datasets: [{
            type: data.chartType,
            fill: true,
            label: data.title,
            data: data.sensors.map((sensor: any) => sensor.value),
            backgroundColor: data.sensors.map((sensor: any) =>
                data.chartType === 'polarArea' || data.chartType === 'radar' || data.chartType === 'line' ? addTransparency(sensor.color, 0.5) : sensor.color
            ),
        }]
    };
}


  private updateChartData(): void {
    if (this.chart) {
      this.chart.data = this.transformToChartData(this.data);
      this.chart.update();
      this.applyGradient()
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

  private applyGradient(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx && this.data.datasets) {
      const gradient = this.createGradient(ctx);
      this.data.datasets.forEach((dataset: any) => {
        dataset.backgroundColor = gradient;
      });
      this.chart.update();
    }
  }

  private onResize = (): void => {
    this.chart?.resize();
  };

  ngOnDestroy(): void {
    this.chart?.destroy();
    window.removeEventListener('resize', this.onResize);
  }
}


