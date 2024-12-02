import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '17936b9f443f999ad7072c689881bb33';  // Replace with your actual weather API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}

  // Method to fetch current weather data by city
  getWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}weather?q=${city}&appid=${this.apiKey}&units=metric`; // no callback parameter needed
    return this.http.jsonp(url, 'callback'); // Angular will handle the callback parameter
  }

  // Method to fetch weather forecast data (if needed)
  getWeatherForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url); // JSONP is not used here
  }
}

