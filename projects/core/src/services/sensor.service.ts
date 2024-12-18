import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private sensorsUrl = 'assets/value.json'; // URL to the sensors JSON
  private sensorsSubject = new BehaviorSubject<any[]>([]);
  private sensorState: { [sensorId: number]: boolean } = {};
  private periodicUpdateActive = true;
  private sensors: any[] = [];
  private skipSensorUpdate = false;
  

  constructor(private http: HttpClient) {
    this.loadSensors();
    this.setupPeriodicUpdates();
  }

  getSensors(skipPeriodicUpdates: boolean = false): Observable<any[]> {
    if (skipPeriodicUpdates) {
      return this.http.get<any[]>(this.sensorsUrl).pipe(
        tap((data) => {
          this.sensors = data;
        })
      );
    }
    return this.sensorsSubject.asObservable();
  }

  setSkipSensorUpdate(flag: boolean): void {
    this.skipSensorUpdate = flag;
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

  assignSensorsToDevice(deviceId: number, sensorIds: number[]): void {
    const updatedSensors = this.sensorsSubject.getValue().map(sensor => ({
      ...sensor,
      deviceId: sensorIds.includes(sensor.id) ? deviceId : sensor.deviceId
    }));
    this.sensorsSubject.next(updatedSensors);
  }
}
