// Importing Angular's Component decorator and other services
import { Component } from '@angular/core';
import { GeonamesService } from '../services/geonames.service';
import { WorldBankService, WorldBankApiResponse } from '../services/world-bank.service';

// Component decorator with metadata about the component
@Component({
  selector: 'app-map', // The custom HTML tag for this component
  templateUrl: './map.component.html', // The HTML template file for this component
  styleUrls: ['./map.component.scss'] // The SCSS stylesheet file for this component
})
export class MapComponent {
  // Properties for holding country information, initialized to empty strings
  countryName: string = '';
  capital: string = '';
  region: string = '';
  incomeLevel: string = '';
  population: string = '';
  iso: string = '';

  // Constructor injecting two services for fetching country data I started with GeoNames first since I like the name of World Bank then I needed to add world bank to get some info for the assessment
  constructor(
    private geonamesService: GeonamesService, // Service for GeoNames API
    private worldBankService: WorldBankService // Service for World Bank API
  ) {}

  // Method triggered when hovering over a country on the map to get the country data
  onCountryHover(event: MouseEvent): void {
    const target = event.target as SVGElement; // Casting the event target as SVGElement
    const countryCode = target.id.toUpperCase(); // Getting the country code in uppercase since the country code was in lowercase in the svg file and didn't know if I needed to be capital case for the apis
    this.getCountryInfo(countryCode); // Calling a method to get the country info
  }

  // Method to get and set country information based on country code
  private getCountryInfo(countryCode: string): void {
    // Fetching data from GeoNames API
    this.geonamesService.getCountryInfo(countryCode).subscribe(
      geoData => {
        if (geoData.geonames && geoData.geonames.length > 0) {
          const country = geoData.geonames[0]; // Getting the first country object
          this.countryName = country.countryName; // Setting country name
          this.capital = country.capital; // Setting capital
          this.population = parseInt(country.population).toLocaleString(); // Setting population and formatting it so it looks better
          this.iso = country.isoNumeric; // Setting ISO numeric code
        } else {
          this.resetInfo('Please Hover Over A Country'); // Reset info if no data
        }
      },
      error => {
        console.error('Error fetching GeoNames data:', error); // Logging error for testing of website but leaving it in so I can test once uploaded to host provider
      }
    );

    // gets data from World Bank API
    this.worldBankService.getCountryDetails(countryCode).subscribe(
      (wbData: WorldBankApiResponse) => {
        if (wbData && wbData[1] && wbData[1].length > 0) {
          this.incomeLevel = wbData[1][0].incomeLevel.value; // Sets income level
          this.region = wbData[1][0].region.value; // Sets region
        } else {
          this.incomeLevel = 'Data not available for income level'; // Setting default message for no data
          this.region = 'Data not available for region'; // Setting default message for no data
        }
      },
      error => {
        console.error('Error fetching World Bank data:', error); // Logging error for testing of website but leaving it in so I can test once uploaded to host provider
      }
    );
  }

  // Method to reset information fields to default and message for the country name
  private resetInfo(defaultMessage: string = ''): void {
    this.countryName = defaultMessage;
    this.capital = '';
    this.region = '';
    this.incomeLevel = '';
    this.population = '';
    this.iso = '';
  }

  // Method calls resetInfo when a country isn't in focus
  onCountryMouseOut(): void {
    this.resetInfo('Please Hover Over A Country');
  }
}
