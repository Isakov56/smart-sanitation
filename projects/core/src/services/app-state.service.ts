import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private devicesSubject = new BehaviorSubject<any[]>(this.getFromLocalStorage('devices') || []);
  private sensorsSubject = new BehaviorSubject<any[]>(this.getFromLocalStorage('sensors') || []);
  private gridLayoutSubject = new BehaviorSubject<any[]>(this.getFromLocalStorage('gridLayout') || []);
  
  devices$ = this.devicesSubject.asObservable();
  sensors$ = this.sensorsSubject.asObservable();
  gridLayout$ = this.gridLayoutSubject.asObservable();

  constructor() {}

  // Setter for devices
  setDevices(devices: any[]): void {
    console.log('Setting devices:', devices);  // Debugging to check if devices are being set correctly
    this.devicesSubject.next(devices);
    this.saveToLocalStorage('devices', devices);  // Save to localStorage
  }

  // Getter for devices
  getDevices(): any[] {
    return this.devicesSubject.getValue();
  }

  // Setter for sensors
  setSensors(sensors: any[]): void {
    console.log('Setting sensors:', sensors);  // Debugging to check if sensors are being set correctly
    this.sensorsSubject.next(sensors);
    this.saveToLocalStorage('sensors', sensors);  // Save to localStorage
  }

  // Getter for sensors
  getSensors(): any[] {
    return this.sensorsSubject.getValue();
  }

  // Setter for grid layout
  setGridLayout(layout: any[]): void {
    console.log('Setting grid layout:', layout);  // Debugging to check if layout is being set correctly
    this.gridLayoutSubject.next(layout);
    this.saveToLocalStorage('gridLayout', layout);  // Save to localStorage
  }

  // Getter for grid layout
  getGridLayout(): any[] {
    return this.gridLayoutSubject.getValue();
  }

  // Helper function to get data from localStorage
  private getFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Helper function to save data to localStorage
  private saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

  
  