import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private jsonUrl = 'assets/value.json';
  private dataSubject = new BehaviorSubject<any[]>([]);
  additionalData = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {
    this.loadvaluesfromDB();
  }

  getValuesGrid(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }
//   loadvaluesfromAPI(){
//     this.data = this.http.get<any[]>(this.jsonUrl);
//   }
  loadvaluesfromDB(){
    this.http.get<any[]>(this.jsonUrl).subscribe(data => {
        this.dataSubject.next(data); // Update the BehaviorSubject
      });
  }
  getValuesGridByID(id: number): any {
    const currentData = this.dataSubject.getValue();
    const returnData = currentData.find(item => item.id === id);
    return returnData ? returnData.value : 'N/A'
    console.log(currentData.find(item => item.id === id), 'teswt teste test vlaues' )
  }
}
