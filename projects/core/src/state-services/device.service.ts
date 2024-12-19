import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from 'ngrx-store';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly devicesUrl = 'assets/cards.json';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesUrl); // Ensure this is a valid observable
  }
}

