import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private paused = false; // Flag to control the streaming
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private buffer: Uint8Array = new Uint8Array();
  private boundaryMarker = new TextEncoder().encode('\r\n--BoundaryString');
  private headerMarker = new Uint8Array([0xFF, 0xD8]);
  private footerMarker = new Uint8Array([0xFF, 0xD9]);
  private currentStreamPromise: Promise<void> | null = null;  // To manage stream reading status
    xSubscribeId: any 
  constructor() {}

  myRespone: any 

  startStream(ctx: CanvasRenderingContext2D): void {
    this.getStreamHeaders()
      .then(xSubscribeId => {
        if (!xSubscribeId) {
          throw new Error('X-Subscribe-Id header is missing.');
        }
        console.log('X-Subscribe-Id:', xSubscribeId);
  
        // Proceed with the calibration request
        // return this.performCalibration(xSubscribeId);
      })
      .then(() => {
        // Start processing the stream after calibration
        this.processChunk(ctx);
      })
      .catch(error => console.error('Error in startStream:', error));
  }
  
  private getStreamHeaders(): Promise<string | null> {
    return fetch('http://192.168.25.16:8094/stream/WEBCAM/2')
      .then(response => {
        // Log all headers
        response.headers.forEach((value, key) => {
          console.log(`${key}: ${value}`, 'All headers');
        });
  
        // Extract the X-Subscribe-Id header
        const xSubscribeId = response.headers.get('X-Subscribe-Id');
        this.reader = response.body?.getReader() || null;
  
        if (!this.reader) {
          throw new Error('Failed to get reader from response');
        }
  
        return xSubscribeId; // Return the extracted header
      });
  }
  
  private performCalibration(xSubscribeId: string): Promise<void> {
    const url = `http://192.168.25.16:8094/stream/calibration/WEBCAM/2?identity=${xSubscribeId}&lowThresh=0&ratio=0&kernelSize=7&blurWidth=3&blurHeight=3&maxArea=0&enable=true&mminContourArea=0`;
    return fetch(url)
      .then(response => response.json()) // Parse the response
      .then(data => {
        console.log('Calibration response:', data);
      });
  }
  

 


  // reading chunks in real time
  private processChunk(ctx: CanvasRenderingContext2D): void {
    if (!this.reader) return;

    const processStream = ({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
      if (done) {
        console.log('Stream ended');
        return;
      }

      if (this.paused) {
        // If paused, do not process the chunks, but ensure to keep reading
        this.currentStreamPromise = this.reader!.read().then(processStream).catch(err => console.error('Error reading chunk:', err));
        return;
      }

      if (!value) return;

      // Append the new chunk to the buffer
      this.buffer = new Uint8Array([...this.buffer, ...value]);

      // Process the buffer for frames / hendling continues data / extracting frames
      let boundaryIndex: number;
      while ((boundaryIndex = this.findPattern(this.buffer, this.boundaryMarker)) !== -1) {
        const startIndex = this.findPattern(this.buffer, this.headerMarker, boundaryIndex);
        const endIndex = this.findPattern(this.buffer, this.footerMarker, boundaryIndex);

        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          const frame = this.buffer.slice(startIndex, endIndex + this.footerMarker.length);
          this.buffer = this.buffer.slice(endIndex + this.footerMarker.length); // Trim buffer
        //   console.log(this.buffer, 'data stream')
        //   console.log(frame, 'data stream')


          // Render the frame
          this.renderFrame(ctx, frame);
        } else {
          break; // Wait for more data
        }
      }

      // Continue reading the next chunk, only if not paused
      if (!this.paused) {
        this.reader!.read().then(processStream).catch(err => console.error('Error reading chunk:', err));
      }
    };

    // Start the reading process
    this.reader.read().then(processStream).catch(err => console.error('Error starting stream:', err));
  }


  // renderign frames
  private renderFrame(ctx: CanvasRenderingContext2D, frame: Uint8Array): void {
    const blob = new Blob([frame], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url); // Free the URL once the image is rendered
    };
    img.src = url;
  }

  private findPattern(data: Uint8Array, pattern: Uint8Array, start = 0): number {
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

  // Pause the stream
  pauseStream(): void {
    this.paused = true;
    console.log('Stream paused');
  }

  // Resume the stream
  resumeStream(ctx: CanvasRenderingContext2D): void {
    if (this.paused && this.reader) {
      this.paused = false;
      console.log('Stream resumed');
      
      // If there's a current stream promise (i.e., a chunk is pending), let it continue processing
      if (this.currentStreamPromise) {
        this.currentStreamPromise.then(() => {
          // Ensure to continue processing from where we left off
          this.processChunk(ctx);
        }).catch(err => console.error('Error resuming stream:', err));
      } else {
        // Otherwise, simply start processing chunks
        this.processChunk(ctx);
      }
    }
  }
}
