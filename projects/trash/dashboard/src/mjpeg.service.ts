// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class MjpegService {

//   constructor(private http: HttpClient) {}

//   // Method to fetch multipart stream as Blob (raw data)
//   getMjpegStream(url: string): Observable<Blob | null> {
//     return this.http.get(url, {
//       responseType: 'blob',
//       headers: new HttpHeaders(),
//       observe: 'response'
//     }).pipe(
//       map(response => response.body as Blob), // Ensure the response body is cast to a Blob
//       catchError(error => {
//         console.error('Error fetching multipart response:', error);
//         return of(null);  // Return null if there’s an error
//       })
//     );
//   }
  
  

//   // Method to parse the multipart response and extract frames (JPEG images)
//   private parseMultipartResponse(blob: Blob): Blob | null {
//     const boundary = this.extractBoundary(blob);  // Find the boundary from headers or response content
//     if (!boundary) {
//       console.error('No boundary found in the multipart response');
//       return null;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const parts = this.splitMultipartData(reader.result as string, boundary);
//       // Process the parts, you can return the first part as a frame or handle the whole stream
//       return parts[0];  // Return the first frame (JPEG image)
//     };

//     reader.readAsText(blob);  // Read the blob as text to extract boundaries

//     return null;  // Temporarily return null until the async operation finishes
//   }

//   // Extract boundary from multipart response
//   private extractBoundary(blob: Blob): string | null {
//     // This is a placeholder: boundary usually comes from the content-type header (you may need to parse headers)
//     return 'your-boundary-here';
//   }

//   // Split the multipart response data based on boundary
//   private splitMultipartData(data: string, boundary: string): string[] {
//     const boundaryRegex = new RegExp(`--${boundary}(.*?)--${boundary}`, 'gs');
//     return [...data.matchAll(boundaryRegex)].map((match) => match[1]);
//   }
// }
