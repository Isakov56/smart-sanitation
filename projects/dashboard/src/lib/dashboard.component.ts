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

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    //  CardComponent,
    // PieChartComponent, CardLoaderComponent, TableComponent,
    // ChartComponent,
    GridsterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  styles: ``,
})
export class DashboardComponent implements OnInit, OnDestroy  {

  // @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  // private streamUrl = 'http://192.168.25.16:8094/stream/WEBCAM/2'; // Replace with your MJPEG stream URL
  private streamSubscription: Subscription | null = null;
  public imgSrc: string | ArrayBuffer | null = null; // Will hold the img source for display

  options: GridsterConfig = {
    draggable: {
      enabled: true,
      stop: (event, item) => this.onGridChange(), // Call on drag stop
    },
    resizable: {
      enabled: true, // Always allow resizing
      stop: () => this.onGridChange(), // Call on resize stop
    },
    gridType: 'verticalFixed',
    fixedRowHeight: 85,
    pushItems: true,
    displayGrid: 'onDrag&Resize',
    compactType: 'none',
    mobileBreakpoint: 500, // Disable mobile-specific behavior (set breakpoint to 0)
    maxCols: 10,
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
    private sanitizer: DomSanitizer
  ) { }

  subscribeId: string | null = null; // Store subscription ID
  isStreaming: boolean = false; // Toggle streaming
  videoStreamUrl: string = 'http://192.168.25.16:8094/stream/WEBCAM/2'; // Stream URL
  xhr: XMLHttpRequest | null = null;

  // getSubscriptionId(): void {
  //   // Create an XMLHttpRequest object
  //   const xhr = new XMLHttpRequest();
  //   console.log('FACCIO CHIAMATA');

  //   // Set up the request to fetch headers from the stream URL
  //   xhr.open('HEAD', this.videoStreamUrl, true); // Use 'HEAD' request to get headers
  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       // Get the 'X-Subscribe-Id' header
  //       this.subscribeId = xhr.getResponseHeader('X-Subscribe-Id');
  //       console.log('Subscription ID:', this.subscribeId);
  //     }
  //   };

  //   // Send the request
  //   xhr.send();
  // }

  // Method to start/stop the stream
  // toggleStream(): void {
  //   this.isStreaming = !this.isStreaming; // Toggle streaming state

  //   // If starting the stream, set the iframe src URL
  //   if (this.isStreaming) {
  //     this.videoStreamUrl = 'http://192.168.25.16:8094/stream/WEBCAM/2';
  //   } else {
  //     this.videoStreamUrl = ''; // Clear the stream URL to stop streaming
  //   }
  // }

  // ngOnDestroy(): void {
  //   if (this.streamSubscription) {
  //     this.streamSubscription.unsubscribe();
  //   }
  // }

  // streamUrl = 'http://localhost:3000/proxy/mjpg'; // Replace with a valid MJPEG stream URL
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
  

//   ngAfterViewInit(): void {
//     const canvas = this.videoCanvas.nativeElement;
//     const ctx = canvas.getContext('2d')!;
  
//     let lastFrameTime = 0;
  
//     // Subscribe to the stream
//     this.streamSubscription = this.streamService.getStream('http://localhost:3000/proxy/mjpg')
//       .subscribe({
//         next: (jpegBlob: Blob) => {
//           const now = Date.now();
  
//           // Skip frames to maintain a 30ms interval (approx 33 FPS)
//           if (now - lastFrameTime < 30) return;
//           lastFrameTime = now;
  
//           // Check if the blob is valid
//           console.log('Received Blob:', jpegBlob);
//           console.log('Blob type:', jpegBlob); // Should be "image/jpeg"
  
//           // Convert Blob to an Image and draw it on the canvas
//           const img = new Image();
//           const blobUrl = URL.createObjectURL(jpegBlob);
//           img.src = URL.createObjectURL(jpegBlob);
//           console.log('Image source:', img.src);
//           // document.body.appendChild(img);
//           console.log(img, 'test')
//           img.onload = () => {
//             console.log('Image loaded successfully');
//             ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image on the canvas
//             URL.revokeObjectURL(blobUrl); // Free up the Blob URL
//           };
          
//           img.onerror = (err) => {
//             console.error('Image load failed:', err);
//           };
          
//           img.src = blobUrl;
//           const reader = new FileReader();
// reader.onloadend = () => {
//   const uint8Array = new Uint8Array(reader.result as ArrayBuffer);
//   console.log('First few bytes of the blob:', uint8Array.slice(0, 10));
// };
// reader.readAsArrayBuffer(jpegBlob);
//         },
//         error: (err) => {
//           console.error('Streaming error:', err);
//         },
//       });
//   }

  

@ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;







// ngAfterViewInit(): void {
  
//   const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
//   const ctx = canvas.getContext('2d')!;
  
//   // Dynamically adjust canvas size
//   canvas.width = 640; // Change to match your stream dimensions
//   canvas.height = 480; // Change to match your stream dimensions

//   this.startStream(ctx, canvas);
// }

// private partialData: Uint8Array = new Uint8Array();

// startStream(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = 'text';

//   xhr.open('GET', 'http://localhost:3000/proxy/mjpg', true);
//   xhr.send();
//   console.log(xhr.response, 'hello')
  
//   xhr.onprogress = () => {
//     if (xhr.readyState === XMLHttpRequest.LOADING && xhr.status === 200 && xhr.response) {
//       const rawResponse = xhr.response; // Text response
//       console.log('Streaming text chunk:', rawResponse.slice(-100)); // Log last 100 characters
//       const frames = rawResponse.split('--myboundary'); // Split frames by boundary marker
//       frames.forEach((frame: string | any[], index: any) => {
//         console.log(`Frame ${index} preview:`, frame.slice(0, 100)); // Log a preview
//       });
//     }
//   };

//   xhr.onerror = (err) => {
//     console.error('Error while fetching MJPEG stream:', err);
//   };
// }

// concatenateArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
//   const result = new Uint8Array(a.length + b.length);
//   result.set(a);
//   result.set(b, a.length);
//   return result;
// }


// findPattern(data: Uint8Array, pattern: Uint8Array, start: number): number {
//   for (let i = start; i <= data.length - pattern.length; i++) {
//     let match = true;
//     for (let j = 0; j < pattern.length; j++) {
//       if (data[i + j] !== pattern[j]) {
//         match = false;
//         break;
//       }
//     }
//     if (match) {
//       return i; // Return the index where the pattern starts
//     }
//   }
//   return -1; // Pattern not found
// }

// parseMJPEG(data: Uint8Array): Uint8Array[] {
//   const boundary = new TextEncoder().encode('\r\n--myboundary');
//   const frames: Uint8Array[] = [];
//   let start = 0;

//   while (start < data.length) {
//     const boundaryIndex = this.findPattern(data, boundary, start);
//     if (boundaryIndex === -1) break;

//     const headerMarker = new Uint8Array([0xFF, 0xD8]); // JPEG Start of Image
// const footerMarker = new Uint8Array([0xFF, 0xD9]); // JPEG End of Image

// const headerIndex = this.findPattern(data, headerMarker, boundaryIndex);
// const footerIndex = this.findPattern(data, footerMarker, boundaryIndex);

//     if (headerIndex !== -1 && footerIndex !== -1 && footerIndex > headerIndex) {
//       frames.push(data.slice(headerIndex, footerIndex + 2));
//       start = footerIndex + 2; // Move past this frame
//     } else {
//       break; // Wait for more data
//     }
//   }

//   return frames;
// }



// Helper function to find pattern in Uint8Array













ngOnDestroy(): void {
  // Cleanup when component is destroyed
  if (this.xhr) {
    this.xhr.abort();
  }
}
  
  
  


  
  currentImage: SafeUrl | null = null;
  private previousUrl: string | null = null;
  layout: any[] = [];

  private initializeLayout(devices: any[]): void {
    this.cardService.getGridItems().subscribe((currentLayout) => {
      const newLayout = devices.map((device) => ({
        id: device.id,
        x: device.x || 0,
        y: device.y || 0,
        cols: device.cols || 1,
        rows: device.rows || 1,
      }));

      this.layout = [
        ...currentLayout.filter((layoutItem: { id: any }) =>
          devices.some(device => device.id === layoutItem.id)
        ),
        ...newLayout.filter(newLayoutItem =>
          !currentLayout.some((layoutItem: { id: any }) => layoutItem.id === newLayoutItem.id)
        )
      ];
    });
    this.appStateService.setGridLayout(this.layout);
  }
  ngOnInit(): void {


    this.appStateService.devices$.subscribe((devices) => {
      this.initializeLayout(devices);
      this.layout = devices;
      // console.log(this.layout, 'devices kjhkh');
      this.onGridChange();
      this.updateDevicesWithSensors(devices);
    });

/*
 this.http.post('http://192.168.25.16:8090/infrastructure-service/api/test', {
      
    })
 */

    // this.http.post('http://192.168.25.16:8090/infrastructure-service/api/test', {

    // })
    //   .subscribe(
    //     (data) => {
    //       console.log('Response Data:', data); // Logs the response data
    //     },
    //     (error) => {
    //       console.error('Error:', error); // Logs the error if the request fails
    //     }
    //   );

    const devices = this.appStateService.getDevices();

    if (devices.length === 0) {
      this.cardService.getGridItems().subscribe((fetchedDevices) => {
        this.devices = fetchedDevices;
        this.layout = fetchedDevices;
        console.log('Fetched devices:', fetchedDevices);
        this.appStateService.setDevices(fetchedDevices);
        this.cdr.detectChanges();
        this.initializeLayout(fetchedDevices);
        this.initializeSensors(fetchedDevices); // Initial sensors assignment
      });
    } else {
      this.devices = devices;
      this.initializeLayout(devices);
      this.initializeSensors(devices); // Initial sensors assignment
    }



    // this.startStreaming();
    // this.streamService.getStream('http://localhost:3000/proxy/mjpg').subscribe({
    //   next: (blob) => {
    //     this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    //   },
    //   error: (error) => {
    //     console.error('Error receiving stream:', error);
    //   },
    // });

    
    
    // this.streamSubscription = this.streamService
    //   .getStream('http://localhost:3000/proxy/mjpg')
    //   .subscribe({
    //     next: (jpegBlob) => {
    //       // Convert the Blob to a Blob URL
    //       const newUrl = URL.createObjectURL(jpegBlob);
    //       this.currentImage = this.sanitizer.bypassSecurityTrustUrl(newUrl);
    //       console.log(this.currentImage, 'tesetstset')

    //       // Revoke the previous Blob URL
    //       if (this.previousUrl) {
    //         URL.revokeObjectURL(this.previousUrl);
    //       }
    //       this.previousUrl = newUrl;
    //     },
    //     error: (err) => {
    //       console.error('Streaming error:', err);
    //     },
    //   });

    

    // this.subscriptions.push(
    //   this.streamService.getHeaders().subscribe((headers) => {
    //     console.log('hello worls', this.imageSrc)
    //     this.headers = headers;
    //   })
    // );

    // this.streamSubscription = this.mjpegService.getMjpegStream(this.streamUrl).subscribe({
    //   next: (imageBlob) => {
    //     if (imageBlob) {
    //       // Create an object URL from the received Blob (JPEG image) and update img src
    //       const objectURL = URL.createObjectURL(imageBlob);
    //       this.imgSrc = objectURL;
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error streaming MJPEG:', err);
    //   }
    // });

    // this.store.dispatch(loadSensors());

    // this.getSubscriptionId();

    // this.http.head('http://192.168.25.16:8094/stream', { observe: 'response' })
    // .subscribe(
    //   (response) => {
    //     this.subscribeId = response.headers.get('X-Subscribe-Id');
    //     console.log(this.subscribeId, 'subscribe id');
    //   },
    //   (error) => {
    //     console.error('Error fetching subscribe ID:', error);
    //   }
    // );

    // Fetch and set devices with sensors as an Observable
    // this.devicesWithSensors$ = this.appStateService.devicesWithSensors$;

    // Subscribe to layout changes and update layout dynamically
    // this.appStateService.devices$.subscribe((devices) => {
    //   this.initializeLayout(devices);
    //   this.layout = devices;
    //   console.log(this.layout, 'devices kjhkh');


    //   this.onGridChange();
    //   this.updateDevicesWithSensors(devices); // Ensure devices and sensors are synchronized here
    // });

    // // Fetch initial devices if not already loaded
    // const devices = this.appStateService.getDevices();

    // if (devices.length === 0) {
    //   this.cardService.getGridItems().subscribe((fetchedDevices) => {
    //     this.devices = fetchedDevices;
    //     this.layout = fetchedDevices;
    //     console.log('Fetched devices:', fetchedDevices);
    //     this.appStateService.setDevices(fetchedDevices);
    //     this.cdr.detectChanges();
    //     this.initializeLayout(fetchedDevices);
    //     this.initializeSensors(fetchedDevices); // Initial sensors assignment
    //   });
    // } else {
    //   this.devices = devices;
    //   this.initializeLayout(devices);
    //   this.initializeSensors(devices); // Initial sensors assignment
    // }
  }

  onGridChange(): void {
    // console.log('Grid layout changed:', this.layout);
    // this.appStateService.setGridLayout(this.layout); // Save updated layout
    this.cdr.detectChanges();
  }

  // private initializeLayout(devices: any[]): void {
  //   this.cardService.getGridItems().subscribe((currentLayout) => {
  //     const newLayout = devices.map((device) => ({
  //       id: device.id,
  //       x: device.x || 0,
  //       y: device.y || 0,
  //       cols: device.cols || 1,
  //       rows: device.rows || 1,
  //     }));
  //   // Merge layouts: retain existing device positions and add new ones
  //     this.layout = [
  //       ...currentLayout.filter((layoutItem: { id: any }) =>
  //         devices.some(device => device.id === layoutItem.id)
  //       ),
  //       ...newLayout.filter(newLayoutItem =>
  //         !currentLayout.some((layoutItem: { id: any }) => layoutItem.id === newLayoutItem.id)
  //       )
  //     ];
  //   });
  //   this.appStateService.setGridLayout(this.layout);
  // }
  private initializeSensors(devices: any[]): void {
    if (!devices || devices.length === 0) {
      console.log('No devices to initialize sensors for.');
      return;
    }}

  private updateDevicesWithSensors(devices: any[]): void {
    // Set flag to prevent update from overwriting new devices
    // this.sensorService.setSkipSensorUpdate(true);
    // this.sensorService.getSensors(false).subscribe((sensors) => {
    //   // Map the devices to include sensors, but only update those with existing devices
    //   const devicesWithSensors = devices.map((device) => ({
    //     ...device,
    //     sensors: sensors.filter((sensor) => sensor.deviceId === device.id),
    //   }));
    //   // Update the app state with devices that now include sensors
    //   this.appStateService.setDevicesWithSensors(devicesWithSensors);
    //   // After the update, allow sensor updates again
    //   this.sensorService.setSkipSensorUpdate(false);
    // });
  }


  //   this.sensorService.getSensors().subscribe((sensors) => {
  //     // Map sensors to the respective devices
  //     this.devicesWithSensors = devices.map((device) => ({
  //       ...device,
  //       sensors: sensors.filter((sensor) => sensor.deviceId === device.id),
  //     }));

  //     // console.log('Updated devices with sensors:', this.devicesWithSensors);

  //     // Update the app state with the new devicesWithSensors
  //     this.appStateService.setDevicesWithSensors(this.devicesWithSensors);
  //   });
  // }

  // getDeviceFromObservable(devices: any[] | null, id: number): any | null {
  //   if (!devices) return null; // Handle null case for the Observable
  //   return devices.find((device) => device.id === id) || null;
  // }
  // Fetch and save chart data when necessary
  fetchAndSaveChartData(): void {
    // Example logic for fetching chart data (replace with actual API call)
    // this.cardService.getGridItems().subscribe((data) => {
    //   this.chartData = data;
    //   this.appStateService.setChartData(data);  // Save chart data to AppStateService
    // });
  }

  // Update chart data based on sensors
  updateChartData(sensors: any[]): void {
    // const updatedChartData = this.chartData.map((data) => {
    //   const correspondingSensor = sensors.find((sensor) => sensor.deviceId === data.deviceId);
    //   if (correspondingSensor) {
    //     return {
    //       ...data,
    //       value: correspondingSensor.value,  // Update value based on sensor
    //     };
    //   }
    //   return data;
    // });
    // this.appStateService.setChartData(updatedChartData);  // Save updated chart data
  }

  //   onGridChange(newLayout: any): void {
  //   this.appStateService.setGridLayout(newLayout);
  // }

  // idValueFunction(id: number): any {
  //   this.idValue = this.valuesService.getValuesGridByID(id)
  // }

  // getWeatherData(city: string): void {
  //   this.weatherService.getWeatherData(city). pipe(delay(0)).subscribe(data => {
  //     this.weatherData = data; // Store weather data
  //     this.prepareChartData(data);  // Prepare chart data based on weather data
  //     this.isLoading = false;
  //   });
  // }

  // prepareChartData(weatherData: any): void {
  //   if (weatherData && weatherData.main) {
  //     this.testChartData = {
  //       labels: ['Morning', 'Afternoon', 'Evening'],
  //       datasets: [
  //         {
  //           label: 'Temperature (°C)',
  //           data: [weatherData.main.temp, 23, 20],
  //           borderColor: 'rgba(75,192,192,1)',
  //           backgroundColor: 'rgba(75,192,192,0.2)',
  //           fill: true,
  //         }
  //       ]
  //     };
  //   }
  // }

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

  // pieChartData = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
  //   datasets: [
  //     {
  //       data: [30, 20, 10, 25, 15],
  //       label: 'Sales',
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //     },
  //   ],
  // };

  // barChartData = {
  //   labels: ['January', 'February', 'March'],
  //   datasets: [
  //     {
  //       data: [65, 59, 80],
  //       label: 'Colors',
  //       backgroundColor: 'green',
  //     },
  //   ],
  // };
}
