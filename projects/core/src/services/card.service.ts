// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CardService {
//   private jsonUrl = 'assets/cards.json';
//   private cardSubject = new BehaviorSubject<any[]>([]);
//   public cards$ = this.cardSubject.asObservable();

//   constructor(private http: HttpClient) {
//     this.http.get<any[]>(this.jsonUrl).subscribe(
//         (data) => this.cardSubject.next(data),
//         (error) => console.error('Error fetching JSON:', error)
//       );
//     this.startPolling();
//   }

//   private startPolling() {
//     setInterval(() => {
//       this.http.get<any[]>(this.jsonUrl).subscribe(
//         (data) => this.cardSubject.next(data),
//         (error) => console.error('Error fetching JSON:', error)
//       );
//     }, 5550); // Poll every 5 seconds
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private jsonUrl = 'assets/cards.json';

  constructor(private http: HttpClient) {}

  getGridItems(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
