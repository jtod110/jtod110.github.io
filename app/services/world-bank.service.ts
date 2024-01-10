// Importing necessary Angular modules and RxJS Observable
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ApiResponseDataItem {
  incomeLevel: { value: string; }; // needed this to get the incomeLevel from the API
  region: { value: string; }; //needed this to get the region from the API
}

export interface WorldBankApiResponse {
  [key: number]: ApiResponseDataItem[];
}


@Injectable({
  providedIn: 'root'
})
export class WorldBankService {
  private baseUrl = 'https://api.worldbank.org/v2/country'; // Base URL of the World Bank API

  // Used for making HTTP requests
  constructor(private http: HttpClient) {}

  // Method for getting info from World Bank API
  getCountryDetails(countryCode: string): Observable<WorldBankApiResponse> {
    // URL for API request inserting the country code of the country hovered over
    const url = `${this.baseUrl}/${countryCode}?format=json`;
    return this.http.get<WorldBankApiResponse>(url); // Performing an HTTP GET request and returning the info
  }
}
