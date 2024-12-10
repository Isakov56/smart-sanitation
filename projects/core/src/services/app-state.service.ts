import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class AppStateService {
    private devicesSubject = new BehaviorSubject<any[]>(this.getFromLocalStorage('devices') || []);
    private sensorsSubject = new BehaviorSubject<any[]>(this.getFromLocalStorage('sensors') || []);
    private gridLayoutSubject = new BehaviorSubject<any[]>(this.getFromLocalStorage('gridLayout') || []);
    private chartDataSubject = new BehaviorSubject<any[]>(this.getFromLocalStorage('chartData') || []); // Store chart data
  
    devices$ = this.devicesSubject.asObservable();
    sensors$ = this.sensorsSubject.asObservable();
    gridLayout$ = this.gridLayoutSubject.asObservable();
    chartData$ = this.chartDataSubject.asObservable();  // Observable for chart data
  
    constructor() {}
  
    setDevices(devices: any[]): void {
      this.devicesSubject.next(devices);
      this.saveToLocalStorage('devices', devices);
    }
  
    getDevices(): any[] {
      return this.devicesSubject.getValue();
    }
  
    setSensors(sensors: any[]): void {
      this.sensorsSubject.next(sensors);
      this.saveToLocalStorage('sensors', sensors);
    }
  
    getSensors(): any[] {
      return this.sensorsSubject.getValue();
    }
  
    setGridLayout(layout: any[]): void {
      this.gridLayoutSubject.next(layout);
      this.saveToLocalStorage('gridLayout', layout);
    }
  
    getGridLayout(): any[] {
      return this.gridLayoutSubject.getValue();
    }
  
    setChartData(data: any[]): void {
      this.chartDataSubject.next(data);
      this.saveToLocalStorage('chartData', data);  // Store chart data in localStorage
    }
  
    getChartData(): any[] {
      return this.chartDataSubject.getValue();  // Get chart data from the subject
    }
  
    private getFromLocalStorage(key: string): any {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  
    private saveToLocalStorage(key: string, data: any): void {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  