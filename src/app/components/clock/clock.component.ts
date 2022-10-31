import { Component, OnInit } from '@angular/core';
import { ClockRegion } from 'src/app/enum/clockRegionEnum';
import { RegionService } from 'src/app/service/region-service.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  clock: string = '';
  regionSetted: string = '-3';
  countries: string[] = [];
  countryMilliseconds: number = 1667241035825;

  constructor( private regionService: RegionService ) { }

  ngOnInit(): void {
    this.startClock();
    this.regionService.getTimeZone().subscribe((res) => {
      this.countries = res;
    })

  }
  
  startClock():void {
    setInterval(() => {
      // const d = new Date();
      // console.log(d)
      // const localTime = d.getTime();
      // console.log(localTime);
      // const localOffset = d.getTimezoneOffset() * 60000;
      // const utc = localTime + localOffset;
      // this.clock = new Date(utc + (3600000 * parseInt(this.regionSetted))).toLocaleString();
      this.countryMilliseconds += 1000;
      this.clock = new Date(this.countryMilliseconds).toLocaleString();
    }, 1000);
  }

  regionSetting(ev: string) {
    this.regionService.getCountryTime().subscribe((res) => {
       this.countryMilliseconds = (new Date(res.currentLocalTime)).getTime();
       console.log(this.countryMilliseconds);
    })
  }
}
