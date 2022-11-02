import { Component, OnInit } from '@angular/core';
import { AlarmMultimediaService } from 'src/app/service/alarm-multimedia.service';
import { RecurrentAlarmService } from 'src/app/service/recurrent-alarm.service';
import { RegionService } from '../../service/region-service.service';

@Component({
  selector: '[app-clock]',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  loading = true;

  clock: string = '';
  countries: string[] = [];
  countryMilliseconds: number = 0;

  scheduledAlarms: any[] = [];
  alarm: number = 16872486541120;

  alarmMultimedia: any;

  constructor( 
    private regionService: RegionService,
    private recurrentAlarmService: RecurrentAlarmService,
    private alarmMultimediaService: AlarmMultimediaService ) 
  {   this.alarmMultimedia = alarmMultimediaService.alarmMultimedia;}

  ngOnInit(): void {
    this.startClock();
    this.regionService.getTimeZone().subscribe((res) => {
      this.countries = res;
    })

    this.regionSet('America/Argentina/Buenos_Aires');
  }
  
  startClock():void {
    setInterval(() => {
      this.countryMilliseconds += 1000;
      let clockDate = new Date(this.countryMilliseconds);
      let hours = clockDate.getHours().toLocaleString().padStart(2, '0');
      let minutes = clockDate.getMinutes().toLocaleString().padStart(2, '0');
      let seconds = clockDate.getUTCSeconds().toLocaleString().padStart(2, '0');
      this.clock = `${hours}:${minutes}:${seconds}`;
      this.compareAlarms( this.countryMilliseconds );

      this.recurrentAlarmService.recurrentValidation.next('');

    }, 1000);
  }

  regionSet(ev: string) {
    this.loading = false;
    this.regionService.getCountryTime(ev).subscribe((res) => {
      setTimeout(() => {this.loading = true;}, 1000);
      this.countryMilliseconds = (new Date(res.currentLocalTime)).getTime();
    })
  }

  compareAlarms( alarmDate: number ) {
    this.scheduledAlarms.forEach((element, index) => {
      if(alarmDate >= element.millisec) {
        element.millisec = 16872486541120;
        const audio = new Audio(this.alarmMultimediaService.alarmMultimediaObj());
        audio.play();
        this.scheduledAlarms.splice(index, 1);
      }
    });
  }

  setAlarm() {
    let alarmDate = new Date(this.alarm);
    let alarm = { millisec: alarmDate.getTime(), completeDate: alarmDate }
    this.scheduledAlarms.push(alarm);
  }

  setAlarmSound(ev: any){
    this.alarmMultimediaService.setAlarmSound(ev);
  }

}
