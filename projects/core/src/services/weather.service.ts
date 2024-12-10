import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '17936b9f443f999ad7072c689881bb33';  // Replace with your actual weather API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/';
  
   weatherDataSubject = new BehaviorSubject<any>(null);  // Use BehaviorSubject to emit data
  private chartDataSubject = new BehaviorSubject<any>(null);
  testChartData$ = this.weatherDataSubject.asObservable();  // Observable that components can subscribe to

  constructor(private http: HttpClient) {
    

  }

  // Method to fetch current weather data by city
  getWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}weather?q=${city}&appid=${this.apiKey}&units=metric`; // no callback parameter needed
    return this.http.jsonp(url, 'callback'); // Angular will handle the callback parameter
  }

  // Method to get weather data and update the subject
  getWeatherDataTest(city: string): void {
    this.getWeatherData(city).pipe(delay(0)).subscribe(data => {
      this.prepareChartData(data); // Prepare chart data
      this.weatherDataSubject.next(data); // Emit data via the BehaviorSubject

    });
  }

  // Method to prepare chart data
  prepareChartData(weatherData: any): void {
    // Check if weatherData and main are defined
    if (weatherData && weatherData.main) {
      const chartData = {
        labels: ['Morning', 'Afternoon', 'Evening'],
        datasets: [
          {
            label: 'Temperature (°C)',
            data: [weatherData.main.temp, 23, 20],  // Use data passed in the parameter
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          }
        ]
      };
      // Update the BehaviorSubject with the chart data
      this.weatherDataSubject.next(chartData);
    } else {
      console.error('Weather data is missing main information');
    }
  }
  

//   getWeatherData(city: string): void {
//     this.weatherService.getWeatherData(city). pipe(delay(0)).subscribe(data => {
//       this.weatherData = data; // Store weather data
//       this.prepareChartData(data);  // Prepare chart data based on weather data
//       this.isLoading = false;
//     });
//   }

  // Method to fetch weather forecast data (if needed)
  getWeatherForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url); // JSONP is not used here
  }
 isAlive() {
    setInterval(() => {
      console.log("It is alive");
    }, 30000); 
  }

   async logEvery30Seconds() {
    while (true) {
      console.log("This message appears every 30 seconds");
      await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for 30 seconds
    }
  }
}

