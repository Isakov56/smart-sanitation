import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from 'ngrx-store';

@Injectable({
  providedIn: 'root',
})
export class SensorServiceNG {
  private sensorsUrl = 'assets/value.json'; // Path to static JSON file

  constructor(private http: HttpClient) {}

  /**
   * Fetch all sensors from JSON file.
   */
  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.sensorsUrl);
  }
}
