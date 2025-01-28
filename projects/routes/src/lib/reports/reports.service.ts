import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor() { }
  private isTableSubject = new BehaviorSubject<boolean>(true);
  
    setTableState(showTable: boolean): void {
      this.isTableSubject.next(showTable);
    }
  
    getTableState(): Observable<boolean> {
      return this.isTableSubject.asObservable();
    }
}
