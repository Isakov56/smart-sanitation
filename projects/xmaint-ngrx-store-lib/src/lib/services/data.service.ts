// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DevicesItem, SensorsItem } from '../state/models/data.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private devicesUrl = 'http://localhost:4200/assets/cards.json'; // Replace with your API endpoint
  private sensorsUrl = 'http://localhost:4200/assets/value.json'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getDevices(): Observable<DevicesItem[]> {
    return this.http.get<DevicesItem[]>(this.devicesUrl);
  }
  getSensors(): Observable<SensorsItem[]> {
    return this.http.get<SensorsItem[]>(this.sensorsUrl);
  }
}
