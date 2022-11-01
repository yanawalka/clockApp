import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/service/region-service.service';

@Component({
  selector: '[app-clock]',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  pipi = true;

  clock: string = '';
  countries: string[] = [];
  countryMilliseconds: number = 0;

  scheduledAlarms: any[] = [];
  alarm: number = 16872486541120;

  recurrentActionSetted: number = 0;

  constructor( private regionService: RegionService ) { }

  ngOnInit(): void {
    this.startClock();
    this.regionService.getTimeZone().subscribe((res) => {
      this.countries = res;
    })

    this.regionSet('America/Argentina/Buenos_Aires');
  }
  
  startClock():void {
    let recurrentAction = 0;
    let recurrentActionMinute = 0;
    setInterval(() => {
      this.countryMilliseconds += 1000;
      let clockDate = new Date(this.countryMilliseconds);
      let hours = clockDate.getHours().toLocaleString().padStart(2, '0');
      let minutes = clockDate.getMinutes().toLocaleString().padStart(2, '0');
      let seconds = clockDate.getUTCSeconds().toLocaleString().padStart(2, '0');
      this.clock = `${hours}:${minutes}:${seconds}`;
      this.compareAlarms( this.countryMilliseconds );

      let recurrentValidation = this.recurrentAlarm(recurrentAction, recurrentActionMinute);
      recurrentAction = recurrentValidation.recurrentAction;
      recurrentActionMinute = recurrentValidation.recurrentActionMinute;

    }, 1000);
  }

  regionSet(ev: string) {
    this.pipi = false;
    this.regionService.getCountryTime(ev).subscribe((res) => {
      setTimeout(() => {this.pipi = true;}, 1000);
      this.countryMilliseconds = (new Date(res.currentLocalTime)).getTime();
    })
  }

  compareAlarms( alarmDate: number ) {
    this.scheduledAlarms.forEach(element => {
      if(alarmDate >= element.millisec) {
        element.millisec = 16872486541120;
        const audio = new Audio("../../../assets/multimedia/tortuga.mp3");
        audio.play();
      }
    });
  }

  setAlarm() {
    let alarmDate = new Date(this.alarm);
    let alarm = { millisec: alarmDate.getTime(), completeDate: alarmDate }
    this.scheduledAlarms.push(alarm);
  }

  recurrentAlarm(recurrentAction: any, recurrentActionMinute: any) {
    if(this.recurrentActionSetted !== 0){
      recurrentAction += 1;
      if (recurrentAction === 60) {
        recurrentAction = 0;
        recurrentActionMinute =+ 1;
      }
      if(recurrentActionMinute >= this.recurrentActionSetted) {
        recurrentActionMinute = 0;
        const audio = new Audio("../../../assets/multimedia/tortuga.mp3");
        audio.play();
      }
    }
    return {recurrentAction, recurrentActionMinute}
  }
}
