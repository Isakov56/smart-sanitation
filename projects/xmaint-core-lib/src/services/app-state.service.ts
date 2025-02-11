import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private devicesSubject = new BehaviorSubject<any[]>([]);
  private devicesWithSensorsSubject = new BehaviorSubject<any[]>([]);
  private gridLayoutSubject = new BehaviorSubject<any[]>([]);

  devices$ = this.devicesSubject.asObservable();
  devicesWithSensors$ = this.devicesWithSensorsSubject.asObservable();
  gridLayout$ = this.gridLayoutSubject.asObservable();

  setDevices(devices: any[]): void {
    this.devicesSubject.next(devices);
  }

  getDevices(): any[] {
    return this.devicesSubject.getValue();
  }

  setDevicesWithSensors(devicesWithSensors: any[]): void {
    this.devicesWithSensorsSubject.next(devicesWithSensors);
  }

  setGridLayout(layout: any[]): void {
    this.gridLayoutSubject.next(layout);
  }

  getGridLayout(): any[] {
    return this.gridLayoutSubject.getValue();
  }

  getDevicesWithSensors(sensors: any[]): any[] {
    return this.getDevices().map(device => ({
      ...device,
      sensors: sensors.filter(sensor => sensor.deviceId === device.id)
    }));
  }
}


  