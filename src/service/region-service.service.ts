import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private cliente: HttpClient) { }

  getTimeZone() {
    const url = 'https://timeapi.io/api/TimeZone/AvailableTimeZones';
    return this.cliente.get<any>(url);
  }

  getCountryTime(country: string) {
    const url = 'https://timeapi.io/api/TimeZone/zone?timeZone='+country;
    return this.cliente.get<any>(url);
  }

}
