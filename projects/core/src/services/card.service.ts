import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private jsonUrl = 'assets/cards.json';
  private cardSubject = new BehaviorSubject<any[]>([]);
  public cards$ = this.cardSubject.asObservable();

  constructor(private http: HttpClient) {
    this.startPolling();
  }

  private startPolling() {
    setInterval(() => {
      this.http.get<any[]>(this.jsonUrl).subscribe(
        (data) => this.cardSubject.next(data),
        (error) => console.error('Error fetching JSON:', error)
      );
    }, 1000); // Poll every 5 seconds
  }
}