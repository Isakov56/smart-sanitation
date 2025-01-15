// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataItem } from '../state/models/data.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'https://api.example.com/data'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getData(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(this.apiUrl);
  }
}
