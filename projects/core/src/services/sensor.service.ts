import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private sensorsUrl = 'assets/value.json'; // URL to the sensors JSON
  private sensorsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadSensors();
    this.setupPeriodicUpdates();
  }

  getSensors(): Observable<any[]> {
    return this.sensorsSubject.asObservable();
  }

  private loadSensors(): void {
    this.http.get<any[]>(this.sensorsUrl).subscribe((data) => {
      this.sensorsSubject.next(data); // Emit loaded sensors
    });
  }

  private setupPeriodicUpdates(): void {
    interval(5000) // Update every 5 seconds
      .pipe(
        switchMap(() => this.http.get<any[]>(this.sensorsUrl)) // Fetch updated sensor data
      )
      .subscribe((data) => {
        this.sensorsSubject.next(data); // Emit updated sensors
      });
  }
}
