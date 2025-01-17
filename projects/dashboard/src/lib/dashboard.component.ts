import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
  Input,
  OnDestroy,
  ViewChild, ElementRef
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'shared';
import { PieChartComponent } from 'charts-lib';
import { ChartComponent } from 'charts-lib';
import { WeatherService } from 'core';
import { CardLoaderComponent } from 'shared';
import { delay, Observable } from 'rxjs';
import { CardService } from 'core';
import { ValuesService } from 'core';
import { SensorService } from 'core';
import { GridComponent } from 'core';
import { AppStateService } from 'core';
import {
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterModule,
} from 'angular-gridster2';
import { combineLatest } from 'rxjs';
import { TableComponent } from 'shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loadSensors } from 'ngrx-store';
import { Subscription } from 'rxjs';
import { StreamService } from '../stream.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { loadDevices } from 'test-store-lib';
import { selectAllDataItems, selectDataLoading, selectDataError } from 'test-store-lib';
import { DataState } from 'test-store-lib'; 
import { LayoutService } from 'core';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    //  CardComponent,
    // PieChartComponent, CardLoaderComponent, TableComponent,
    ChartComponent,
    GridsterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  styles: ``,
})
export class DashboardComponent implements OnInit, OnDestroy  {

  data$: Observable<any[] | undefined>;
  devices$: Observable<any[] | undefined>;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;

  // @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  // private streamUrl = 'http://192.168.25.16:8094/stream/WEBCAM/2'; // Replace with your MJPEG stream URL
  private streamSubscription: Subscription | null = null;
  public imgSrc: string | ArrayBuffer | null = null; // Will hold the img source for display

  options: GridsterConfig = {
    draggable: { enabled: true },
  resizable: { enabled: true },
  gridType: 'verticalFixed',
  fixedRowHeight: 85,
  pushItems: true,
  displayGrid: 'onDrag&Resize',
  compactType: 'none',
  mobileBreakpoint: 500,
  maxCols: 10
    // maxItemCols: 4,
    // maxRows: 6,
    // maxItemRows: 3
  };
  gridItems: GridsterItem[] = [
    { x: 0, y: 0, cols: 2, rows: 1, content: 'Card 1' },
    { x: 2, y: 0, cols: 1, rows: 1, content: 'Card 2' },
    { x: 0, y: 1, cols: 1, rows: 2, content: 'Card 3' },
  ];
  values: any[] = [];
  idValue: any = '';
  cards: any[] = [];
  devices: any[] = [];
  weatherData: any;
  testChartData?: any;
  isLoading = true;
  devicesWithSensors: any[] = [];
  
  chartData!: any[];

  devicesWithSensors$!: Observable<any[]>;


  imageSrc: SafeUrl | undefined;

  useCanvas: boolean = false; // Set to true to use the canvas method
  private subscriptions: Subscription[] = [];
  canvas: any;
  

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef,
    private cardService: CardService,
    private valuesService: ValuesService,
    private sensorService: SensorService,
    private appStateService: AppStateService,
    private http: HttpClient,
    private store: Store,
    private streamService: StreamService,
    private sanitizer: DomSanitizer,
    private layoutService: LayoutService
  ) { 
    this.data$ = this.store.select(selectAllDataItems);  // Select data
    this.loading$ = this.store.select(selectDataLoading);  // Select loading state
    this.error$ = this.store.select(selectDataError);
    this.devices$ = this.store.select(selectAllDataItems);
  }

  reload() {
    this.store.dispatch(loadDevices());  // Dispatch the action to load data
  }

  

  subscribeId: string | null = null; // Store subscription ID
  isStreaming: boolean = false; // Toggle streaming
  videoStreamUrl: string = 'http://192.168.25.16:8094/stream/WEBCAM/2'; // Stream URL
  xhr: XMLHttpRequest | null = null;
  streamUrl: SafeUrl | null = null;
  imageUrl: string | undefined = '';
  headers: string = '';

  private drawFrameOnCanvas(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      console.log(img.src, 'all of sudden surprise ')
      img.onload = () => {
        const canvas = this.canvas.nativeElement;
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    };
    reader.readAsDataURL(blob);
  }

  @ViewChild('videoCanvas', { static: true }) videoCanvas!: ElementRef<HTMLCanvasElement>;
  testData: any 
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoTag', { static: true }) videoTag!: ElementRef<HTMLVideoElement>;
  statusMessage: string = ''; // Add a status message to show the stream status
  isStreamPaused: boolean = false; // Track stream state

  ngAfterViewInit(): void {
    if (this.videoCanvas && this.videoCanvas.nativeElement) {
      const canvas: HTMLCanvasElement = this.videoCanvas.nativeElement;
      const ctx = canvas.getContext('2d')!;
      this.streamService.startStream(ctx); // Start the stream when the view is initialized
    }
  }

  pauseStream(): void {
    this.streamService.pauseStream();
    this.isStreamPaused = true; // Update the state to paused
    this.statusMessage = 'Stream Paused'; // Update the status message
  }

  resumeStream(): void {
    if (this.videoCanvas && this.videoCanvas.nativeElement) {
      const canvas: HTMLCanvasElement = this.videoCanvas.nativeElement;
      const ctx = canvas.getContext('2d')!;
      this.streamService.resumeStream(ctx);
      this.isStreamPaused = false; // Update the state to resumed
      this.statusMessage = 'Stream Resumed'; // Update the status message
    } else {
      console.error('Canvas element is not available.');
    }
  }

  startStream(ctx: CanvasRenderingContext2D): void {
    fetch('http://localhost:3000/proxy/mjpg')
      .then(response => {
        const reader = response.body?.getReader();
        if (!reader) throw new Error('Failed to get reader from response');
  
        const boundaryMarker = new TextEncoder().encode('\r\n--myboundary');
        const headerMarker = new Uint8Array([0xFF, 0xD8]); // JPEG header / standard jpgeg format, it is speicified on that
        const footerMarker = new Uint8Array([0xFF, 0xD9]); // JPEG footer
  
        let buffer = new Uint8Array();
        let frameCount = 0;
  
        const processChunk = (result: ReadableStreamReadResult<Uint8Array>) => {
          const { done, value } = result;
  
          if (done) {
            console.log('Stream ended');
            return;
          }
  
          if (!value) return; // vlue is in the form of unit8array 
  
          // Append new chunk to the buffer
          const tempBuffer = new Uint8Array(buffer.length + value.length);
          // console.log(headerMarker,'testtes tes')
          tempBuffer.set(buffer);
          tempBuffer.set(value, buffer.length);
          buffer = tempBuffer;
  
          // Process the buffer for frames
          let boundaryIndex: number;
          while ((boundaryIndex = this.findPattern(buffer, boundaryMarker)) !== -1) {
            const startIndex = this.findPattern(buffer, headerMarker, boundaryIndex);
            const endIndex = this.findPattern(buffer, footerMarker, boundaryIndex);
  
            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
              // Extract frame data
              const frame = buffer.slice(startIndex, endIndex + footerMarker.length);
              buffer = buffer.slice(endIndex + footerMarker.length); // Trim buffer / By slicing the buffer to remove processed data, the memory used by older frames is freed.
              // Garbage Collection: The browser's garbage collector reclaims memory from temporary objects (e.g., Blob, Image, or old buffers) once they go out of scope.
              // console.log(`Frame ${++frameCount}: Extracted JPEG frame with size: ${frame.length}`);
              // console.log(frame, 'fram frame frema')
              // Render the frame
              this.renderFrame(ctx, frame);
            } else {
              break; // Wait for more data
            }
          }
  
          // Read next chunk
          reader.read().then(processChunk).catch(err => console.error('Error reading chunk:', err));
        };
  
        reader.read().then(processChunk).catch(err => console.error('Error reading stream:', err));
      })
      .catch(error => console.error('Error fetching stream:', error));
  }
  

  renderFrame(ctx: CanvasRenderingContext2D, frame: Uint8Array): void {
    const blob = new Blob([frame], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob); // this URL is like a temporary path to access the data.
    const img = new Image();
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url); // tells the browser, "Hey, I don't need this temporary URL anymore, you can delete it now!"
    };
    img.src = url;
  }

  findPattern(data: Uint8Array, pattern: Uint8Array, start = 0): number {
    for (let i = start; i <= data.length - pattern.length; i++) {
      let match = true;
      for (let j = 0; j < pattern.length; j++) {
        if (data[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }
    return -1; // Pattern not found
  }

  

@ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;












ngOnDestroy(): void {
  // Cleanup when component is destroyed
  if (this.xhr) {
    this.xhr.abort();
  }
  if (this.sidebarToggleSubscription) {
    this.sidebarToggleSubscription.unsubscribe();
  }
}
  
  
  


  
  currentImage: SafeUrl | null = null;
  private previousUrl: string | null = null;
  layout: any[] = [];
  private sidebarToggleSubscription: Subscription | undefined;

  @ViewChild(GridsterComponent) gridsterComponent!: GridsterComponent;

  adjustGridOnResize(): void {
    // Logic to adjust the grid size when the sidebar is toggled
    // You can trigger gridster's resize method here if necessary
    const gridster = this.gridsterComponent; // Reference to your GridsterComponent
    if (this.gridsterComponent) {
      window.dispatchEvent(new Event('resize'));
    }
  }
  
  
  ngOnInit(): void {
    this.sidebarToggleSubscription = this.layoutService.sidebarToggled$.subscribe(() => {
      console.log('Sidebar toggled - adjusting grid');
      this.adjustGridOnResize(); // Adjust the grid layout based on the sidebar state
    });
    this.store.dispatch(loadDevices());
    this.devices$.subscribe(data => {
      if (data) {
        console.log('Data received from store:', data);
      } else {
        console.log('No data available yet.');
      }
    });

    this.store.select(selectAllDataItems).subscribe(data => {
      console.log('Data from store:', data);

      if (data) {
       this.layout = data.map(item => ({ ...item }));
        console.log(this.layout, 'sajf;ldjflaksjdfklas pqowieutr laksjhdf')
        this.cdr.detectChanges();
      }
    });
    
    
  }

  getDeviceFromObservable(devices: any[] | null, id: number): any | null {
    if (!devices) return null; // Handle null case for the Observable
    return devices.find((device) => device.id === id) || null;
  }

  

  onGridChange(event?: any, item?: any): void {
    if (event && item) {
      console.log('Grid change detected:', { event, item });
    }

    this.saveLayout();
    this.cdr.detectChanges();
  }
  private saveLayout(): void {
    console.log('Saving layout:', this.layout);
  }

  generateCards(count: number): void {
    const sampleCard = {
      title: 'Shiba Inu',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      alt: 'Photo of a Shiba Inu',
      content: '',
    };

    this.cards = Array.from({ length: count }, () => ({ ...sampleCard }));
  }

}
