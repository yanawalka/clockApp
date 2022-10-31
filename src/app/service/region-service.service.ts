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

  getCountryTime() {
    const url = 'https://timeapi.io/api/TimeZone/zone?timeZone=America/Argentina/Buenos_Aires';
    return this.cliente.get<any>(url);
  }

}
