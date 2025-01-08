import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StreamService {
  constructor(private http: HttpClient) {}
  private headersSubject = new Subject<string>();
  getHeaders(): Observable<string> {
    return this.headersSubject.asObservable();
  }

  getStream(url: string): Observable<Blob> {
    const subject = new Subject<Blob>();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Accept', 'multipart/x-mixed-replace'); // Inform the server to send MJPEG stream
    xhr.responseType = 'arraybuffer';

    xhr.onloadstart = () => {
      console.log('Starting MJPEG stream...');
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        const headers = xhr.getAllResponseHeaders();
        console.log('Headers received: ', xhr.getAllResponseHeaders());
        this.headersSubject.next(headers);
      }
    };

    

    xhr.onprogress = () => {
        //const rawResponse = xhr.responseText;
//   console.log('Raw response received:', rawResponse);
 console.log(xhr, 'ny bnlosl')
 const jpegData = this.parseRawJPEG(xhr.response);
 console.log(jpegData, 'jpeg datat test')
      // Parse the received chunk
      const chunks = new Uint8Array(xhr.response);
        // console.log('Progress event received, length:', chunks);
        
    //     const blob = this.parseMultipartData(chunks);
    //     console.log('Progress event received, blobs:', blob);
    //   if (blob) {
    //     subject.next(blob);
    //     console.log('Blob parsed successfully');
    //   }else {
    //     console.log('No valid blob parsed yet.');
    //   }
    };

    xhr.onerror = () => {
      console.error('Error streaming MJPEG');
      subject.error(new Error('Error streaming MJPEG'));
    };

    xhr.send();

    return subject.asObservable();
  }

  private buffer: Uint8Array = new Uint8Array();

  private parseRawJPEG(buffer: ArrayBuffer): Uint8Array | null {
    try {
      // Converti il buffer in stringa per analizzare i metadati
      const textChunk = new TextDecoder().decode(buffer);
  
      // Cerca il boundary
      const boundaryIndex = textChunk.indexOf('--myboundary');
      if (boundaryIndex === -1) {
        console.log('Boundary not found in the chunk.');
        return null;
      }
  
      // Trova la fine delle intestazioni
      const headerEndIndex = textChunk.indexOf('\r\n\r\n', boundaryIndex);
      if (headerEndIndex === -1) {
        console.log('Headers are incomplete.');
        return null;
      }
  
      // I dati JPEG iniziano subito dopo '\r\n\r\n'
      const jpegStartIndex = headerEndIndex + 4;
  
      // Estrai i dati JPEG come Uint8Array
      return new Uint8Array(buffer.slice(jpegStartIndex));
    } catch (error) {
      console.error('Error while parsing JPEG:', error);
      return null;
    }
  }
  
  

  private parseMultipartData(chunk: ArrayBuffer): Blob | null {
    const textChunk = new TextDecoder().decode(chunk);
  
    // Identify the boundary marker
    const boundaryMatch = textChunk.match(/--myboundary/);
    if (!boundaryMatch || boundaryMatch.index === undefined) {
      console.log('Boundary not found in the chunk.');
      return null;
    }
  
    // Find headers and the JPEG data
    const headerEndIndex = textChunk.indexOf('\r\n\r\n', boundaryMatch.index);
    if (headerEndIndex === -1) {
      console.log('Headers are incomplete in the chunk.');
      return null;
    }
  
    // Extract headers
    const headersText = textChunk.substring(boundaryMatch.index, headerEndIndex);
    console.log('Headers:', headersText);
  
    // Determine where the binary JPEG data starts
    const binaryDataStart = headerEndIndex + 4;
  
    // Convert the binary JPEG portion
    const binaryChunk = chunk.slice(binaryDataStart);
    return new Blob([binaryChunk], { type: 'image/jpeg' });
  }
  

  
  
}