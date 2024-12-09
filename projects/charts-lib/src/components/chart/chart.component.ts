import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, ChangeDetectorRef, OnInit  } from '@angular/core';
import { Chart, ChartType, ChartOptions, registerables  } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { CardLoaderComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'core';
import { animation } from '@angular/animations';
// import { WeatherService } from 'core';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  imports: [MatCard, CardLoaderComponent, CommonModule],
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  
  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) {}
  
  @Input() chartType: ChartType = 'bar';
  @Input() data: any;
  @Input() isLoading: boolean = false;
  @Input() options: ChartOptions = { responsive: true, maintainAspectRatio: false };
  @Input() gradientConfig: { startColor: string; endColor: string; direction: 'horizontal' | 'vertical' } = {
    startColor: '#090979', endColor: '#0096b4', direction: 'horizontal'
  };

  chartData: any = { // Initialize chartData
    labels: [],
    datasets: []
  };

  ngOnInit(): void {
    /*
    this.weatherService.testChartData$.subscribe((data: any) => {
      if (data && data.datasets) {
        this.chart.data = data; // Set new chart data
        this.chart.update(); // Refresh the chart
      }
    });
    */
    if (!this.data) {
      console.error('No data received in app-chart!');
      return;
    }
      const chartData = this.transformToChartData(this.data); // Transform the data
    if (chartData) {
      this.chart.data = chartData; // Set the transformed data
      this.chart.update(); // Refresh the chart
    }
    console.log(chartData, 'datatsdatadatadaatadatadtadatadata')
  }

  transformToChartData(data: any): any {
    if (!data || !data.sensor) return null;
  
    const labels = data.sensor.map((sensor: any, index: number) => `Sensor ${sensor.id || index + 1}`);
    const dataset = {
      type: data.chartType,
      label: data.title,
      data: data.sensor.map((sensor: any) => sensor.id), // Example: Use sensor IDs as data points
      backgroundColor: data.sensor.map((sensor: any) => sensor.color),
      transition: 'none !imoprtant',
      animation: 'none !important' // Colors from the data
    };
  
    return {
      labels: labels,
      datasets: [dataset],
    };
  }

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;
  ngAfterViewInit(): void {
    
    // this.cdr.detectChanges();
    if (!this.chartCanvas) return; // Prevent running if canvas isn't available
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context could not be initialized.');
      return;
    }
  
  
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.chartData,
      options: this.options,
    });
    this.chart?.update();
  
    // Add resize listener for manual resizing
    window.addEventListener('resize', this.onResize);
  }


  ngOnChanges(): void {
    if (this.data) {
      this.chartData = this.transformToChartData(this.data);
    }
    // if (this.chart) {
    //   this.chart.data = this.chartData;
    //   this.chart.update(); // Refresh chart
    // }
    // this.weatherService.testChartData$.subscribe((data: any) => {
    //   if (data && data.datasets) {
    //     this.chart.data = data; // Set new chart data
    //     this.chart.update(); // Refresh the chart
    //   }
    // });
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


