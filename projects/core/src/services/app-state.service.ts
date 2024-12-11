import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private devicesSubject = new BehaviorSubject<any[]>([]);
  private sensorsSubject = new BehaviorSubject<any[]>([]);
  private gridLayoutSubject = new BehaviorSubject<any[]>([]);
  private devicesWithSensorsSubject = new BehaviorSubject<any[]>([]);

  devices$ = this.devicesSubject.asObservable();
  sensors$ = this.sensorsSubject.asObservable();
  gridLayout$ = this.gridLayoutSubject.asObservable();
  devicesWithSensors$ = this.devicesWithSensorsSubject.asObservable();

  constructor() {}

  setDevices(devices: any[]): void {
    this.devicesSubject.next(devices);
  }

  getDevices(): any[] {
    return this.devicesSubject.getValue();
  }

  setSensors(sensors: any[]): void {
    this.sensorsSubject.next(sensors);
  }

  getSensors(): any[] {
    return this.sensorsSubject.getValue();
  }

  setGridLayout(layout: any[]): void {
    this.gridLayoutSubject.next(layout);
  }

  getGridLayout(): any[] {
    return this.gridLayoutSubject.getValue();
  }

  setDevicesWithSensors(devicesWithSensors: any[]): void {
    this.devicesWithSensorsSubject.next(devicesWithSensors);
  }

  getDevicesWithSensors(): any[] {
    return this.devicesWithSensorsSubject.getValue();
  }
}

  