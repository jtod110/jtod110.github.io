// Importing necessary Angular modules and RxJS Observable
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeonamesService {
  private baseUrl = 'http://api.geonames.org'; // Base URL for geonames api
  private username = 'jtod110'; // my username needed for api request

  // Service for making HTTP requests
  constructor(private http: HttpClient) {}

  // Method to get country information from GeoNames API
  getCountryInfo(countryCode: string): Observable<any> {
    // URL for API request inserting the country code of the country hovered over and adding my username
    const url = `${this.baseUrl}/countryInfoJSON?country=${countryCode}&username=${this.username}`;
    return this.http.get(url); // Performing an HTTP GET request and returning the info
  }
}
